import * as SerialPort from 'serialport';
import { AtCommand } from './at/AtCommands';

export interface ModemError {
    event: string;
    error?: Error;
}

export interface ModemTimeout extends ModemError {

}

export interface ModemResponse {
    atCommand: string;
    lines?: string[];
}

export interface IModem {
    open(): Promise<void>;
    close(): Promise<void>;
    send(command: string | AtCommand): Promise<ModemResponse>;
    onData: (data: string) => void;
}

interface TailItem {
    successCallback: (value?: any | PromiseLike<ModemResponse>) => void; 
    errorCallback: (reason?: any) => void;
    atCommand: AtCommand;
    timer?: NodeJS.Timer;
}

export class Modem implements IModem {

    private response: string = '';

    private tail: TailItem[] = [];

    private readonly LF: number = 10;
    private readonly CR: number = 13;

    private readonly OK: string = 'OK';
    private readonly ERROR: string = 'ERROR';
    private readonly LINE_END: string = String.fromCharCode(this.CR, this.LF);
    // private readonly MESSAGE_END: string = this.LINE_END + this.OK + this.LINE_END;
    private readonly ERROR_END: string = this.LINE_END + this.ERROR + this.LINE_END;
    private readonly SEND_CHAR: string = String.fromCharCode(this.LF);
    private readonly CONTROL: string = String.fromCharCode(62, 32);
    private readonly CTRL_Z_ESC: string = String.fromCharCode(26);

    private readonly MESSAGE_END: RegExp = /\r\n(OK|ERROR|BUSY|DATA|NO CARRIER)\r\n$|(CONNECT( .+)*$)\r\n$/i;

    public onData;


    constructor(private serialPort: SerialPort) {
        this.serialPort.on('close', this.onCloseEventHandler.bind(this));
        this.serialPort.on('data', this.onDataEventHandler.bind(this));
        this.serialPort.on('error', this.onErrorEventHandler.bind(this));
        this.serialPort.on('open', this.onOpenEventHandler.bind(this));
    }

    private onCloseEventHandler(err?: Error): void {
        // console.log('onclose', err);
    }

    private onDataEventHandler(buffer: Buffer): void {
        this.response += buffer.toString();
        if(this.response.match(this.MESSAGE_END)) {
            // console.log(this.response.replace(/\r/g, '<CR>').replace(/\n/g,'<LF>'));
            let lines: string[] = this.response.split(this.LINE_END);
            this.response = '';
            // console.log(lines);
            if(lines.length > 2 && this.tail.length > 0) {
                let item: TailItem = this.tail.shift();
                if (item.timer) {
                    clearTimeout(item.timer);
                }
                if(lines[0] != item.atCommand.command) {
                    item.errorCallback('Command not match');
                }
                let res: ModemResponse = { atCommand: lines[0] };
                if(lines.length >= 4) {
                    res.lines = lines.slice(1, lines.length - 2);
                }
                if (lines[lines.length - 2] == this.OK) {
                    item.successCallback(res);
                } else {
                    item.errorCallback(res);
                }
            }
            this.sendNextItem();
        } else if(this.response.endsWith(this.LINE_END) && this.tail.length == 0) {
            if(this.onData) {
                this.onData(this.response.toString());
            }
            this.response = '';
        } else if (this.response.endsWith(this.CONTROL)) {
            console.log(this.response);
            let lines = this.response.split(this.LINE_END);
            this.response = '';
            if(this.tail.length > 0) {
                let item: TailItem = this.tail.shift();
                let cmd: AtCommand = item.atCommand;
                if (cmd.pdu) {
                    this.serialPort.write(cmd.pdu, cmd.encoding || 'ascii', (err: any, bytesWritten: number) => {
                        if(item.timer) {
                            clearTimeout(item.timer);
                        }
                        if(err) {
                            return item.errorCallback(err);
                        }
                        let res: ModemResponse = { atCommand: item.atCommand.command };
                        item.successCallback(res); // TODO
                        this.sendNextItem();
                    });
                }
            } else {
                this.serialPort.write([26], 'hex', (err: any, bytesWritten: number) => {
                    this.sendNextItem();
                });
            }
        }
    }

    private onErrorEventHandler(err: Error): void {
        console.log('onerror', err);
    }

    private onOpenEventHandler(err?: Error): void {
        // console.log('onopen', err);
    }

    private sendNextItem(): void {
        if(this.tail.length > 0) {
            let item: TailItem = this.tail[0];
            let cmd: string = item.atCommand.command;
            // console.log(cmd); // TODO: delete this line
            this.serialPort.write(cmd + this.SEND_CHAR, 'ascii', (err: any, bytesWritten: number) => {
                if (err) {
                    return item.errorCallback(err);
                }
                let timer = setTimeout(() => {
                    let error: ModemTimeout = { event: 'timeout' };
                    item.errorCallback(error);
                }, item.atCommand.timeout || 1000);
            });
        }
    }

    private pushAndSend(item: TailItem): void {
        this.tail.push(item);
        if(this.tail.length == 1) {
            this.sendNextItem();
        }
    }

    public open(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.serialPort.open((err?: Error) => {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    public close(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.serialPort.close((err?: Error) => {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    public send(command: string | AtCommand): Promise<ModemResponse> {
        let promise: Promise<ModemResponse> = new Promise<ModemResponse>((resolve, reject) => {
            let cmd: AtCommand;
            if (typeof command == 'string') {
                cmd = { command: command };
            } else {
                cmd = command;
            }
            let item: TailItem = {
                atCommand: cmd,
                successCallback: resolve,
                errorCallback: reject
            };
            this.pushAndSend(item);
        });
        return promise;
    }
}
import { IModem } from './Modem';
import { AtCommands3GPP27005, IAtCommands3GPP27005 } from './at/AtCommands3GPP27005';
import { setQuotationMarks } from '.';
import { ExtendCommandModes, AtCommand } from './at/AtCommands';

export interface SmsInfo {
    index: number;
    stat: 'REC UNREAD' | 'REC READ' | 'STO UNSENT' | 'STO SENT' | 'ALL' | 0 | 1 | 2 | 3 | 4 | number | string;
    oa_da: string;
    alpha: string;
    scts: string;
    msg: string;
}

export class Sms {
    
    private cmds: IAtCommands3GPP27005;
    
    constructor(private modem: IModem) {
        this.cmds = new AtCommands3GPP27005();
    }

    sendUssd(code: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.modem.send(this.cmds.getExtendedCommandWrite('cusd', 1, setQuotationMarks(code)))
                .then(res => resolve())
                .catch(reject);
        });
    }

    sendSms(da: string, message: string): Promise<boolean> { // TODO: boolean response
        return new Promise<boolean>((resolve, reject) => {
            this.modem.send(this.cmds.at_cmgf(ExtendCommandModes.WRITE, 1))
                .then(res => {
                    return this.modem.send(this.cmds.getExtendedCommandWrite('cscs', '\"GSM\"'));
                }).then(res => {
                    let msg = message + String.fromCharCode(26); // TODO: validar longitud
                    let atCmd = this.cmds.at_cmgs(da); // TODO: special characters?
                    atCmd.pdu = msg;
                    return this.modem.send(atCmd);
                })
                .then(res => resolve())
                .catch(reject);
        });
    }

    sendSmsUtf16(da: string, message: string, len: number): Promise<string> {
        throw new Error("Method not implemented.");
    }

    list(stat: 'REC UNREAD' | 'REC READ' | 'STO UNSENT' | 'STO SENT' | 'ALL'): Promise<SmsInfo[]> {
        return new Promise<SmsInfo[]>((resolve, reject) => {
            this.modem.send(this.cmds.at_cmgf(ExtendCommandModes.WRITE, 1))
                .then(res => {
                    let atCmd = this.cmds.at_cmgl(setQuotationMarks(stat)); // TODO: special characters?
                    return this.modem.send(atCmd);
                })
                .then(res => {
                    let list: SmsInfo[] = [];
                    res.lines.forEach((l: string, i: number, a: string[]) => {
                        if (l.startsWith('+CMGL:')) {
                            let info: string[] = l.split(': ')[1].split(',"');
                            if (info.length == 5) {
                                // TODO: Regexp
                                list.push({
                                    index: Number.parseInt(info[0]),
                                    stat: info[1],
                                    oa_da: info[2].replace(String.fromCharCode(34), ''),
                                    alpha: info[3].replace(String.fromCharCode(34), ''),
                                    scts: info[4].replace(String.fromCharCode(34), ''),
                                    msg: a[i + 1]
                                });
                            }
                        }
                    });
                    resolve(list);
                }).catch(reject); // TODO
        });
    }

    read(index: number): Promise<SmsInfo> {
        return new Promise<SmsInfo>((resolve, reject) => {
            this.modem.send(this.cmds.at_cmgf(ExtendCommandModes.WRITE, 1))
                .then(res => {
                    let atCmd = this.cmds.at_cmgr(index, 1); // TODO: special characters?
                    return this.modem.send(atCmd);
                })
                .then(res => {
                    let smsInfo: SmsInfo;
                    res.lines.forEach((l: string, i: number, a: string[]) => {
                        if (l.startsWith('+CMGR:')) {
                            let info: string[] = l.split(': ')[1].split(',"');
                            // TODO: Regexp
                            if(info.length == 4) {
                                smsInfo = {
                                    index: index,
                                    stat: info[0].replace(/\"/g, ''),
                                    oa_da: info[1].replace(/\"/g, ''),
                                    alpha: info[2].replace(/\"/g, ''),
                                    scts: info[3].replace(/\"/g, ''),
                                    msg: a[i + 1]
                                }
                            }
                        }
                    });
                    resolve(smsInfo);
                }).catch(reject); // TODO
        });
    }

    delete(index: number, delflag: 0 | 1 | 2 | 3 | 4): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.modem.send(this.cmds.at_cmgd(index, delflag))
                .then(res => resolve())
                .catch(reject);
        });
    }

}

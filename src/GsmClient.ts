import { IModem } from "./Modem";
import { AtCommandsV25TER } from "./at/AtCommandsV25TER";
import { ExtendCommandModes } from "./at/AtCommands";
import { Power } from "./Power";
import { SimCard } from "./SimCard";
import { Network } from "./Network";
import { Gprs } from "./Gprs";
import { Phone } from "./Phone";
import { Sms } from "./Sms";
import { Location } from "./Location";
import { Time } from "./Time";
import { Battery } from "./Battery";
import { EventEmitter } from 'events';
import { UnsolicitedResultCodes, UnsolicitedResultCode } from "./at/UnsolicitedResultCodes";
import { Email } from "./Email";

export interface IGsmClient {

    on(event: string, handler: (...args: any[]) => void): void;
    start(): Promise<boolean>;
    end(): Promise<void>;

    
    // Basic functions
    productId(): Promise<string>;
    manufacturerId(): Promise<string>;
    modelId(): Promise<string>;
    globalId(): Promise<string>;
    IMEI(): Promise<string>;
    subscriberId(): Promise<string>;
    serviceProviderName(): Promise<string>;
    getInfo(): Promise<any>;

    power: Power;
    simCard: SimCard;
    network: Network;
    gprs: Gprs;
    phone: Phone;
    sms: Sms;
    email: Email;
    location: Location;
    time: Time;
    battery: Battery;
}

export class GenericGsmClient implements IGsmClient {

    private eventEmmiter: EventEmitter;

    private atCommands: AtCommandsV25TER;
    private unsolicitedResultCodes: UnsolicitedResultCodes;

    power: Power;
    simCard: SimCard;
    network: Network;
    gprs: Gprs;
    phone: Phone;
    sms: Sms;
    email: Email;
    location: Location;
    time: Time;
    battery: Battery;    

    constructor(private modem: IModem) {
        this.eventEmmiter = new EventEmitter();

        this.modem.onData = this.onDataHandler.bind(this);

        this.atCommands = new AtCommandsV25TER();
        this.unsolicitedResultCodes = new UnsolicitedResultCodes();
        this.power = new Power(this.modem);
        this.simCard = new SimCard(this.modem);
        this.network = new Network(this.modem);
        this.gprs = new Gprs(this.modem);
        this.phone = new Phone(this.modem);
        this.sms = new Sms(this.modem);
        this.email = new Email(this.modem);
        this.location = new Location(this.modem);
        this.time = new Time(this.modem);
        this.battery = new Battery(this.modem);
    }

    private onDataHandler(data: string): void {
        console.log(data.replace(/\r/g, '<CR>').replace(/\n/g,'<LF>'));
        let urc: UnsolicitedResultCode = this.unsolicitedResultCodes.evalute(data);
        if(urc) {
            let d = data.replace(urc.regexp, '');
            this.eventEmmiter.emit(urc.code, d);
        }
        if (data.match(/\+CUSD:/i)) {
            let parts = data.split(',');
            if (parts.length == 3 || parts.length == 4) {
                let result = {
                    m: parts[1].replace(/\n/g, ''),
                    str_urc: parts[2].replace(/\r\n/g, '').replace(/\s/g, ''),
                    dcs: parts[3] || ''
                };
                this.eventEmmiter.emit('ussd', result);
            }
        } else if(data.match(/\+CMGS:/i)) {
            let i = data.split(':')[1].replace(/\r\n/g, '').replace(/\s/g, '');
            this.eventEmmiter.emit('sms_sended', { index: i }); // TODO: friendly, public, static events names
        }
    }

    private open(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.modem.open().then(() => {
                console.log('Modem open');
                let atCommand = this.atCommands.at();
                this.modem.send(atCommand).then(res => resolve()).catch(reject);
            }).catch(reject);
        });
    }

    on(event: string, handler: (...args: any[]) => void): void {
        this.eventEmmiter.addListener(event, handler);
    }
    
    /**
     * Initialize the Gsm client
     */
    start(): Promise<boolean> {
        if (this.modem.isOpen()) {
            return new Promise<boolean>((resolve, reject) => {
                let atCommand = this.atCommands.at();
                this.modem.send(atCommand).then(res => resolve()).catch(reject);
            });
        } else {
            return this.open();
        }
    }

    end(): Promise<void> {
        return this.modem.close();
    }

    productId(): Promise<string> {
        let atCommand = this.atCommands.ati();
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    manufacturerId(): Promise<string> {
        let atCommand = this.atCommands.at_gmi(ExtendCommandModes.EXECUTION);
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    modelId(): Promise<string> {
        let atCommand = this.atCommands.at_gmm(ExtendCommandModes.EXECUTION);
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    globalId(): Promise<string> {
        let atCommand = this.atCommands.at_goi(ExtendCommandModes.EXECUTION);
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    IMEI(): Promise<string> {
        let atCommand = this.atCommands.at_gsn(ExtendCommandModes.EXECUTION);
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    /**
     * Request International Mobile Subscriber Identity
     */
    subscriberId(): Promise<string> {
        let atCommand = this.atCommands.at_cimi(ExtendCommandModes.EXECUTION);
        return new Promise<string>((resolve, reject) => {
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    /**
     * Get service provider name form SIM
     */
    serviceProviderName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let atCommand = this.atCommands.at_cspn();
            this.modem.send(atCommand).then(res => resolve(res.lines[0])).catch(reject);
        });
    }

    getInfo(): Promise<any> {
        var info: any = {};
        // TODO: send only one command
        return new Promise<any>((resolve, reject) => {
            this.productId().then(res => {
                info.productId = res;
                return this.manufacturerId();
            }).then(res => {
                info.manufacturerId = res;
                return this.modelId();
            }).then(res => {
                info.modelId = res;
                return this.globalId();
            }).then(res => {
                info.globalId = res;
                return this.IMEI();
            }).then(res => {
                info.IMEI = res;
                return this.subscriberId();
            }).then(res => {
                info.subscriberId = res;
                return this.serviceProviderName();
            }).then(res => {
                info.serviceProvider = res;
                resolve(info);
            }).catch(reject);
        });
    }

}
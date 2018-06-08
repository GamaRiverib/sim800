import { EmailApplication } from './at';
import { ExtendCommandModes } from './at/AtCommands';
import { IModem } from './Modem';
import { setQuotationMarks } from '.';

export interface ApnConfiguration {
    apn: string;
    user?: string;
    pass?: string;
}

export interface SmtpServerConfiguration {
    host: string;
    port?: number;
    user?: string;
    pass?: string;
}

export interface EmailAddress {
    email: string;
    name?: string;    
}

// TODO: move from here
const apnConfig: ApnConfiguration = {
    apn: 'internet.itelcel.com',
    user: 'webgprs',
    pass: 'webgprs2003'
};

export class Email {

    private cmds: EmailApplication;
    private configured: boolean = false;
    private isConfiguring: boolean = false;
    private failedAttempts: number = 0;

    constructor(private modem: IModem) {
        this.cmds = new EmailApplication();
    }

    private configure(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if(this.configured) {
                return resolve(true);
            }
            this.modem.send(this.cmds.at_sapbr(ExtendCommandModes.WRITE, 3, 1, setQuotationMarks('Contype'), setQuotationMarks('GPRS')))
            .then(res => {
                return this.modem.send(this.cmds.at_sapbr(ExtendCommandModes.WRITE, 3, 1, setQuotationMarks('APN'), setQuotationMarks(apnConfig.apn)));
            }).then(res => {
                return this.modem.send(this.cmds.at_sapbr(ExtendCommandModes.WRITE, 3, 1, setQuotationMarks('USER'), setQuotationMarks(apnConfig.user)));
            }).then(res => {
                return this.modem.send(this.cmds.at_sapbr(ExtendCommandModes.WRITE, 3, 1, setQuotationMarks('PWD'), setQuotationMarks(apnConfig.pass)));
            }).then(res => {
                return this.modem.send(this.cmds.at_sapbr(ExtendCommandModes.WRITE, 1, 1));
            })
            .then(res => {
                this.configured = true;
                this.isConfiguring = false;
                this.failedAttempts = 0;
                resolve(this.configured);
            })
            .catch(err => {
                this.isConfiguring = false;
                this.failedAttempts++;
                reject(err);
            });
        });
    }

    public sendEmail(smtp: SmtpServerConfiguration, from: EmailAddress, to: EmailAddress, subject: string, body: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.configure()
                .then(res => {
                    if (!this.configured || this.isConfiguring) {
                        return reject('GsmClient is not configured');
                    }
                    this.modem.send(this.cmds.at_emailcid(ExtendCommandModes.WRITE, '1'))
                        .then(res => {
                            return this.modem.send(this.cmds.at_emailto(ExtendCommandModes.WRITE, 60));
                        })
                        .then(res => {
                            let n: 0 | 1 | 2 = 0;
                            if(smtp.port == 25) {
                                n = 2;
                            } else if(smtp.port == 465) {
                                n = 1
                            }
                            return this.modem.send(this.cmds.at_emailssl(ExtendCommandModes.WRITE, n));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtpsrv(ExtendCommandModes.WRITE, setQuotationMarks(smtp.host)));
                        })
                        .then(res =>  {
                            return this.modem.send(this.cmds.at_smtpauth(ExtendCommandModes.WRITE, 1, setQuotationMarks(smtp.user), setQuotationMarks(smtp.pass)));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtpfrom(ExtendCommandModes.WRITE, setQuotationMarks(from.email), from.name ? setQuotationMarks(from.name) : ''));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtprcpt(ExtendCommandModes.WRITE, 0, 0, setQuotationMarks(to.email), to.name ? setQuotationMarks(to.name) : ''));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtpsub(ExtendCommandModes.WRITE, setQuotationMarks(subject)));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtpbody(ExtendCommandModes.WRITE, body));
                        })
                        .then(res => {
                            return this.modem.send(this.cmds.at_smtpsend(ExtendCommandModes.EXECUTION));
                        })
                        .then(res => resolve())
                        .catch(reject);
                }).catch((err) => {
                    console.log(err);
                    if(this.failedAttempts < 5) {
                        setTimeout(this.configure.bind(this), 5000);
                    }
                    reject(err);
            });
        });
    }
}
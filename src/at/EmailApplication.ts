import { AtCommands, AtCommand, ExtendCommandModes } from "./AtCommands";

export class EmailApplication {
    
    private atCommands: AtCommands;

    constructor() {
        this.atCommands = new AtCommands();
    }

    /**
     * Extended command: Bearer settings for applications based on IP.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.WRITE)} mode
     * @param {(0 | 1 | 2 | 3 | 4)} [type]
     * @param {(1 | 2 | 3)} [cid]
     * @param {string} [tag]
     * @param {string} [val]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_sapbr(mode: ExtendCommandModes.TEST | ExtendCommandModes.WRITE, type?: 0 | 1 | 2 | 3 | 4, cid?: 1 | 2 | 3, tag?: string, val?: string): AtCommand {
        let x = 'sapbr';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.WRITE:
                let atCommand: AtCommand = this.atCommands.getExtendedCommandWrite(x, type, cid, tag, val);
                /*if(type == 2) {
                    atCommand = this.atCommands.getExtendedCommandWrite(x, cid, tag, val);
                } else if (type ==  4) {
                    atCommand = this.atCommands.getExtendedCommandWrite(x, tag, val);
                }*/
                return atCommand;
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set email bearer profile identifier.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {string} [cid]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_emailcid(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, cid?: string): AtCommand {
        let x = 'emailcid';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, cid);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set timeout value of SMTP/POP3 server response.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {number} [timeout]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_emailto(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, timeout?: number): AtCommand {
        let x = 'emailto';
        if(timeout && timeout < 10) {
            timeout = 10;
        }
        if(timeout && timeout > 120) {
            timeout = 120;
        }
        if(!timeout) {
            timeout = 30;
        }
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, timeout);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set SMTP server address and port
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {string} [server]
     * @param {number} [port]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpsrv(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, server?: string, port?: number): AtCommand {
        let x = 'smtpsrv';
        if(port && port < 1) {
            port = 25;
        }
        if(port && port > 65535) {
            port = 25;
        }
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, server, port);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set username and password for SMTP authentication.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {(0 | 1)} [type]
     * @param {string} [user]
     * @param {string} [pass]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpauth(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, type?: 0 | 1, user?: string, pass?: string): AtCommand {
        let x = 'smtpauth';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, type, user, pass);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set sender address and name.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {string} [sender]
     * @param {string} [name]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpfrom(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, sender?: string, name?: string): AtCommand {
        let x = 'smtpfrom';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, sender, name);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set the email recipient (TO, CC, BCC) address and name.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {(0 | 1 | 2)} [type]
     * @param {number} [index]
     * @param {string} [address]
     * @param {string} [name]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtprcpt(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, type?: 0 | 1 | 2, index?: number, address?: string, name?: string): AtCommand {
        let x = 'smtprcpt';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, type, index, address, name);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set the email subject.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {string} [subject]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpsub(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, subject?: string): AtCommand {
        let x = 'smtpsub';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, subject);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set the email body.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} mode
     * @param {string} [body]
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpbody(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, body?: string): AtCommand {
        let x = 'smtpbody';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                let atCommand: AtCommand = this.atCommands.getExtendedCommandWrite(x, body.length);
                atCommand.pdu = body;
                return atCommand;
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    // TODO: at_smptfile

    /**
     * Extended command: Send the email.
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} mode
     * @returns {AtCommand}
     * @memberof EmailApplication
     */
    at_smtpsend(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'smtpsend';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    // SSL/TLS support

    at_emailssl(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, n?: 0 | 1 | 2): AtCommand {
        let x = 'emailssl';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, n);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }
}
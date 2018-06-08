import { AtCommands, AtCommand, ExtendCommandModes } from "./AtCommands";

export enum ErrorAtdResponse {
    NO_DIALTONE = 'NO DIALTONE',
    BUSY = 'BUSY',
    NO_CARRIER = 'NO CARRIER',
    NO_ANSWER = 'NO ANSWER'
}

/**
 *
 *
 * @export
 * @class AtCommandsV25TER
 */
export class AtCommandsV25TER {

    // TODO: 2.2.26 -> 2.2.32
    // TODO: 2.2.40 -> 2.2.42

    private atCommands: AtCommands;

    constructor() {
        this.atCommands = new AtCommands();
    }
    
    /**
     * Execution command: Re-issue the last command given
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    a(): AtCommand {
        return { command: 'a/' };
    }

    /**
     * Test command
     *
     * @returns {AtCommand}
     * @memberof AtCommandsV25TER
     */
    at(): AtCommand {
        return { command: 'at' };
    }

    /**
     * Execution command: Answer an incoming call
     *
     * TA sends off-hook to the remote station.
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ata(): AtCommand {
        return this.atCommands.getBasicCommand('a');
    }

    /**
     * Execution command: Mobile originated call to dial a number
     *
     * Max response time 20 seconds
     *
     * @param {string} [values] String of dialing and optionally V.25ter modifiers dialing. 0-9, *, #, +, A-C
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atd(values?: string): AtCommand {
        let cmd: AtCommand = this.atCommands.getBasicCommand('d', values);
        cmd.timeout = 20000;
        return cmd;
    }

    /**
     * Execution command: Redial last telephone number used
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atdl(): AtCommand {
        return this.atCommands.getBasicCommand('dl');
    }

    /**
     * Execution command: Set command echo mode
     *
     * Max response time 20 seconds
     *
     * @param {(0 | 1)} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ate(value: 0 | 1): AtCommand {
        let cmd = this.atCommands.getBasicCommand('e', value.toString());
        cmd.timeout = 20000;
        return cmd;
    }

    /**
     * Execution command: Disconnect existing connection
     *
     * Max response time 20 seconds
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ath(): AtCommand {
        let cmd = this.atCommands.getBasicCommand('h');
        cmd.timeout = 20000;
        return cmd;
    }

    /**
     * Execution command: Display product identification information
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ati(): AtCommand {
        return this.atCommands.getBasicCommand('i');
    }

    /**
     * Execution command: Set monitor speaker loudness
     *
     * @param {(0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atl(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): AtCommand {
        return this.atCommands.getBasicCommand('l', value.toString());
    }

    /**
     * Execution command: Set monitor speaker mode
     *
     * @param {(0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atm(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): AtCommand {
        return this.atCommands.getBasicCommand('m', value.toString());
    }

    /**
     * Execution command: Switch from Data Mode or PPP Online Mode to Command Mode
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    plusplusplus(): AtCommand {
        return { command: '+++' };
    }

    /**
     * Execution command: Switch from Command Mode to Data Mode
     *
     * @param {string} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ato(value: string): AtCommand {
        return this.atCommands.getBasicCommand('o', value);
    }

    /**
     * Execution command: Select pulse dialing
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atp(): AtCommand {
        return this.atCommands.getBasicCommand('p');
    }

    /**
     * Execution command: Set result code presentation mode
     *
     * @param {(0 | 1)} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atq(value: 0 | 1): AtCommand {
        return this.atCommands.getBasicCommand('q', value.toString());
    }

    /**
     * Read or write command: Set number of rings before automatically answering the call
     *
     * @param {number} [n] 0, 1-255
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats0(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s0', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set command line termination character
     *
     * @param {string} [n] 13
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats3(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s3', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set response formating character
     *
     * @param {number}
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats4(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s4', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set command line editing character
     *
     * @param {number} [n] 0 -> 127, default 8
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats5(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s5', n ? n.toString() : '');
    }

    /**
     * Read or write command: Pause before blind dialing
     *
     * @param {number} [n] 0 -> 999
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats6(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s6', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set number of seconds to wait for connection completion
     *
     * @param {number} [n] 1 -> 255, default 60
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats7(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s7', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set number of seconds to wait for comma dial modifier
     * encountered in dial string of D command
     *
     * @param {number} [n] 0 -> 255
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats8(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s8', n ? n.toString() : '');
    }

    /**
     * Read or write command: Set disconnect delay after indicating the absence of
     * Data Carrier
     *
     * @param {number} [n] 1 -> 254, default 15
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    ats10(n?: number): AtCommand {
        return this.atCommands.getBasicCommand('s10', n ? n.toString() : '');
    }

    /**
     * Execution command: Select tone dialing
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    att(): AtCommand {
        return this.atCommands.getBasicCommand('t');
    }

    /**
     * Execution command: TA response format
     *
     * @param {(0 | 1)} value
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    atv(value: 0 | 1): AtCommand {
        return this.atCommands.getBasicCommand('v', value.toString());
    }

    // TODO: 2.2.26 -> 2.2.32


    /**
     * Execution command: Request complete TA capabilities list
     *
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_gcap(): AtCommand {
        return this.atCommands.getExtendedCommandExecution('gcap');
    }

    /**
     * Test or execution command: Request manufacturer identification
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_gmi(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'gmi';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Test or execution command: Request TA model identification
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_gmm(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'gmm';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Test or execution command: Request TA revision identification of software release
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_gmr(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'gmr';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Test or execution command: Request Global Object Identification
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_goi(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'goi';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Test or execution command: Request TA Serial Number Identification (IMEI)
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_gsn(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'gsn';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Set TE-TA control character framing
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommandsV25TER
     */
    at_icf(mode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, format?: 1 | 2 | 3 | 4 | 5 | 6, parity?: 0 | 1 | 3): AtCommand {
        let x = 'icf';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.atCommands.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.atCommands.getExtendedCommandWrite(x, format, parity);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Extended command: Request International Mobile Subscriber Identity
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION)} mode
     * @returns {AtCommand}
     * @memberof AtCommandsV25TER
     */
    at_cimi(mode: ExtendCommandModes.TEST | ExtendCommandModes.EXECUTION): AtCommand {
        let x = 'cimi';
        switch(mode) {
            case ExtendCommandModes.TEST:
                return this.atCommands.getExtendedCommandTest(x);
            case ExtendCommandModes.EXECUTION:
                return this.atCommands.getExtendedCommandExecution(x);
            default:
                return this.atCommands.getExtendedCommandTest(x);
        }
    }

    /**
     * Read command: Get service provider name from SIM
     *
     * @returns {AtCommand}
     * @memberof AtCommandsV25TER
     */
    at_cspn(): AtCommand {
        return this.atCommands.getExtendedCommandRead('cspn');
    }

}
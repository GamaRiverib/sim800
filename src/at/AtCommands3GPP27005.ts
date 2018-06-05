import { AtCommands, ExtendCommandModes, IAtCommands, AtCommand } from "./AtCommands";

export interface IAtCommands3GPP27005 extends IAtCommands {

    /**
     * Test or Write command: Delete SMS message
     * 
     * Max response time 25 seconds
     *
     * @param {number} index Value in the range of location numbers supported by the associated memory
     * @param {(0 | 1 | 2 | 3 | 4)} [delflag]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgd(index?: number, delflag?: 0 | 1 | 2 | 3 | 4): AtCommand;

    /**
     * Extended command: Select SMS message format
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} extendMode
     * @param {(0 | 1)} [mode] 0: PDU mode, 1: Text mode
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgf(extendMode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, mode?: 0 | 1): AtCommand;

    /**
     * Test or Write command: List SMS message from preferred store
     * 
     * Max response time 20 seconds
     *
     * @param {(string | number)} stat 'REC UNREAD', 'REC READ', 'STO UNSET', 'STO SENT', 'ALL', 0 , 1, 2, 3, 4
     * @param {(0 | 1)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgl(stat?: string | number, mode?: 0 | 1): AtCommand;

    /**
     * Test or Write command: Read SMS message
     * 
     * Max response time 5 seconds
     *
     * @param {number} index
     * @param {(0 | 1)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgr(index?: number, mode?: 0 | 1): AtCommand;

    /**
     * Test or Write command: Send SMS message
     *
     * @param {string} da
     * @param {number} [toda]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgs(da?: string, toda?: number): AtCommand;

    // TODO: 4.2.6 - 4.2.16
}

export class AtCommands3GPP27005 extends AtCommands implements IAtCommands3GPP27005 {
    /**
     * Test or Write command: Delete SMS message
     *
     * Max response time 25 seconds
     *
     * @param {number} index Value in the range of location numbers supported by the associated memory
     * @param {(0 | 1 | 2 | 3 | 4)} [delflag]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgd(index?: number, delflag?: 0 | 1 | 2 | 3 | 4): AtCommand {
        let x = 'cmgd';
        if(index) {
            let cmd = this.getExtendedCommandWrite(x, index, delflag);
            if(delflag && delflag > 0) {
                cmd.timeout = 25000;
            } else {
                cmd.timeout = 5000;
            }
            return cmd;
        } else {
            return this.getExtendedCommandTest(x);
        }
    }
    /**
     * Extended command: Select SMS message format
     *
     * @param {(ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE)} extendMode
     * @param {(0 | 1)} [mode] 0: PDU mode, 1: Text mode
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgf(extendMode: ExtendCommandModes.TEST | ExtendCommandModes.READ | ExtendCommandModes.WRITE, mode?: 0 | 1): AtCommand {
        let x = 'cmgf';
        switch(extendMode) {
            case ExtendCommandModes.TEST:
                return this.getExtendedCommandTest(x);
            case ExtendCommandModes.READ:
                return this.getExtendedCommandRead(x);
            case ExtendCommandModes.WRITE:
                return this.getExtendedCommandWrite(x, mode);
            default:
                return this.getExtendedCommandTest(x);
        }
    }
    /**
     * Test or Write command: List SMS message from preferred store
     *
     * Max response time 20 seconds
     *
     * @param {(string | number)} stat 'REC UNREAD', 'REC READ', 'STO UNSET', 'STO SENT', 'ALL', 0 , 1, 2, 3, 4
     * @param {(0 | 1)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgl(stat?: string | number, mode?: 0 | 1): AtCommand {
        let x = 'cmgl';
        if(stat) {
            let cmd = this.getExtendedCommandWrite(x, stat, mode);
            cmd.timeout = 20000;
            return cmd;
        } else {
            return this.getExtendedCommandTest(x);
        }
    }
    /**
     * Test or Write command: Read SMS message
     *
     * Max response time 5 seconds
     *
     * @param {number} index
     * @param {(0 | 1)} [mode]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgr(index?: number, mode?: 0 | 1): AtCommand {
        let x = 'cmgr';
        if(index) {
            let cmd = this.getExtendedCommandWrite(x, index, mode);
            cmd.timeout = 5000;
            return cmd;
        } else {
            return this.getExtendedCommandTest(x);
        }
    }
    /**
     * Test or Write command: Send SMS message
     * 
     * Max response time 30 seconds
     *
     * @param {string} da
     * @param {number} [toda]
     * @returns {AtCommand}
     * @memberof IAtCommands3GPP27005
     */
    at_cmgs(da?: string, toda?: number): AtCommand {
        let x = 'cmgs';
        if(da) {
            let cmd = this.getExtendedCommandWrite(x, da, toda);
            cmd.timeout = 30000;
            return cmd;
        } else {
            return this.getExtendedCommandTest(x);
        }
    }
}
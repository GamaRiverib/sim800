export interface UnsolicitedResultCode {
    code: string;
    regexp: RegExp;
}

export class UnsolicitedResultCodes {
    /**
     * Indication of a call that is currently waiting and can be accepted.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CCWA: UnsolicitedResultCode = { code: 'CCWA', regexp: /\+CCWA:/i };

    /**
     * The calling line identity (CLI) of the calling party when receiving a mobile terminated call.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CLIP: UnsolicitedResultCode = { code: 'CLIP', regexp: /\+CLIP:/i };

    /**
     * Indicates incoming call to the TE if extended format is enabled.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CRING: UnsolicitedResultCode = { code: 'CRING', regexp: /\+CRING:/i };

    /**
     * There is a change in the MT network registration status or a change of the network cell.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CREG: UnsolicitedResultCode = { code: 'CREG', regexp: /\+CREG:/i };


    public static readonly CCWV: UnsolicitedResultCode = { code: 'CCWV', regexp: /\+CCWV:/i };

    /**
     * Indicates that new message has been received.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CMTI: UnsolicitedResultCode = { code: 'CMTI', regexp: /\+CMTI:/i };

    /**
     * Indicates that new message has been received.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CMT: UnsolicitedResultCode = { code: 'CMT', regexp: /\+CMT:/i };

    /**
     * Indicates that new cell brodcast message has been received.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CMB: UnsolicitedResultCode = { code: 'CMB', regexp: /\+CMB:/i };

    /**
     * Indicates that new SMS status report has been received.
     *
     * @static
     * @type {UnsolicitedResultCode}
     * @memberof UnsolicitedResultCodes
     */
    public static readonly CDS: UnsolicitedResultCode = { code: 'CDS', regexp: /\+CDS:/i };
    public static readonly COLP: UnsolicitedResultCode = { code: 'COLP', regexp: /\+COLP:/i };
    public static readonly CSSU: UnsolicitedResultCode = { code: 'CSSU', regexp: /\+CSSU:/i };
    public static readonly CSSI: UnsolicitedResultCode = { code: 'CSSI', regexp: /\+CSSI:/i };
    public static readonly CLCC: UnsolicitedResultCode = { code: 'CLCC', regexp: /\+CLCC:/i };

    // TODO: *PSNWID, *PSUTTZ,

    public static readonly CTZV: UnsolicitedResultCode = { code: 'CTZV', regexp: /\+CTZV:/i };

    public static readonly CSMINS: UnsolicitedResultCode = { code: 'CSMINS', regexp: /\+CSMINS:/i };
    public static readonly CDRIND: UnsolicitedResultCode = { code: 'CDRIND', regexp: /\+CDRIND:/i };

    // TODO: +CHF, +CENG, MO RING, MO CONNECTED

    public static readonly CPIN: UnsolicitedResultCode = { code: 'CPIN', regexp: /\+CPIN:/i };
    public static readonly CSQN: UnsolicitedResultCode = { code: 'CSQN', regexp: /\+CSQN:/i };

    public static readonly SIMTONE: UnsolicitedResultCode = { code: 'SIMTONE', regexp: /\+SIMTONE:/i };
    public static readonly STTONE: UnsolicitedResultCode = { code: 'STTONE', regexp: /\+STTONE:/i };

    // TODO: +CR

    public static readonly CUSD: UnsolicitedResultCode = { code: 'CUSD', regexp: /\+CUSD:/i };
    public static readonly RING: UnsolicitedResultCode = { code: 'RING', regexp: /RING/i };

    // TODO: NORMAL POWER DOWN, +CMTE

    public static readonly UNDER_VOLTAGE_POWER_DOWN: UnsolicitedResultCode = { code: 'UNDER-VOLTAGE POWER DOWN', regexp: /UNDER-VOLTAGE POWER DOWN/i };
    public static readonly UNDER_VOLTAGE_WARNING: UnsolicitedResultCode = { code: 'UNDER-VOLGATE WARNING', regexp: /UNDER-VOLGATE WARNING/i };    
    public static readonly OVER_VOLTAGE_POWER_DOWN: UnsolicitedResultCode = { code: 'OVER-VOLTAGE POWER DOWN', regexp: /OVER-VOLTAGE POWER DOWN/i };
    public static readonly OVER_VOLTAGE_WARNING: UnsolicitedResultCode = { code: 'OVER-VOLTAGE WARNING', regexp: /OVER-VOLTAGE WARNING/i };

    // TODO: CHARGER-ONLY MODE, RDY

    public static readonly CALL_READY: UnsolicitedResultCode = { code: 'Call Ready', regexp: /Call Ready/i };
    public static readonly CFUN: UnsolicitedResultCode = { code: 'CFUN', regexp: /\+CFUN:/i };
    public static readonly CONNECT_OK: UnsolicitedResultCode = { code: 'CONNECT OK', regexp: /(\d,)?CONNECT OK/i };
    public static readonly CONNECT: UnsolicitedResultCode = { code: 'CONNECT', regexp: /CONNECT/i };
    public static readonly CONNECT_FAIL: UnsolicitedResultCode = { code: 'CONNECT FAIL', regexp: /(\d,)?CONNECT FAIL/i };
    public static readonly ALREADY_CONNECT: UnsolicitedResultCode = { code: 'ALREADY CONNECT', regexp: /(\d,)?ALREADY CONNECT/i };
    public static readonly SEND_OK: UnsolicitedResultCode = { code: 'SEND OK', regexp: /(\d,)?SEND OK/i };
    public static readonly CLOSED: UnsolicitedResultCode = { code: 'CLOSED', regexp: /(\d,)?CLOSED/i };

    // TODO: RECV FROM, +IPD, +RECEIVE, REMOTE IP, +CDNSGIP, +PDP DEACT

    public static readonly SAPBR: UnsolicitedResultCode = { code: 'SAPBR', regexp: /\+SAPBR/i }; // TODO: +SAPBR <cid>:
    public static readonly HTTPACTION: UnsolicitedResultCode = { code: 'HTTPACTION', regexp: /\+HTTPACTION:/i };

    // +FTPGET... 

    // cmgs, cmss

    private codes: UnsolicitedResultCode[] = [];

    constructor() {
        for(var k in UnsolicitedResultCodes) {
            this.codes.push(UnsolicitedResultCodes[k]);
        }
    }

    public evalute(val: string): UnsolicitedResultCode {
        let urc: UnsolicitedResultCode;
        let index = -1;
        this.codes.forEach((v: UnsolicitedResultCode, i: number) => {
            if(v.regexp.test(val)) {
                index = i;
                return;
            }
        });
        if (index >= 0) {
            urc = this.codes[index];
        } 
        return urc;
    }
}
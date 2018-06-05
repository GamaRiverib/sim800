import { IModem } from "./Modem";

export class Power {

    constructor(private modem: IModem) {

    }

    restart(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    powerOff(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    radioOff(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    sleepEnable(enable: boolean): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}

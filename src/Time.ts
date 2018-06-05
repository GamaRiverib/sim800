import { IModem } from "./Modem";

export class Time {

    constructor(private modem: IModem) {

    }

    // Time functions
    getGsmDateTime(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

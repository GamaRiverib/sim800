import { IModem } from "./Modem";

export class Location {

    constructor(private modem: IModem) {

    }

    // Location functions
    getGsmLocation(): Promise<string> {
        throw new Error("Method not implemented.");
    }


}

import { IModem } from "./Modem";

export class Network {

    constructor(private modem: IModem) {

    }

    // Network functions
    signalQuality(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    isNetworkConnected(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

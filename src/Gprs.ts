import { IModem } from "./Modem";

export class Gprs {

    constructor(private modem: IModem) {

    }

    // GPRS functions
    gprsConnect(apn: string, user?: string, password?: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    gprsDisconnect(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    isGprsConnected(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    localIp(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

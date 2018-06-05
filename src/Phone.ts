import { IModem } from "./Modem";

export class Phone {

    constructor(private modem: IModem) {

    }

    // Phone functions
    gsmBusy(busy: boolean): Promise<string> {
        throw new Error("Method not implemented.");
    }

    answerCall(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    call(phoneNumber: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    hangupCall(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    sendDtmf(cmd: string, duration: number): Promise<string> {
        throw new Error("Method not implemented.");
    }


}

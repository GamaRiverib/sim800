import { IModem } from "./Modem";

export class SimCard {

    constructor(private modem: IModem) {

    }

    // Sim card functions
    simUnlock(pin: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    simCcid(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    simStatus(timeout?: number): Promise<string> {
        throw new Error("Method not implemented.");
    }

    simRegistrationStatus(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    simOperator(): Promise<string> {
        throw new Error("Method not implemented.");
    }


}

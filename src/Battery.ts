import { IModem } from "./Modem";

export class Battery {

    constructor(private modem: IModem) {
        
    }

    // Battery functions
    getBatteryVoltage(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    getBatteryPorcentage(): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

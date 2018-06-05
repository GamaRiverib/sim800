import { OpenOptions } from 'serialport';

export class Sim800 {

    public static readonly SERIAL_OPEN_OPTIONS: OpenOptions = {
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1
    };

}
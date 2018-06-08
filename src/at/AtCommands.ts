import { clean } from '..';

export enum CommandCategories {
    BASIC,
    S_PARAMETER,
    EXTENDED
}

export enum ExtendCommandModes {
    TEST = 't',
    READ = 'r',
    WRITE = 'w',
    EXECUTION = 'e'
}

export interface AtCommand {
    command: string;
    category?: CommandCategories;
    extended?: ExtendCommandModes;
    timeout?: number;
    pdu?: string | number[]  | Buffer;
    encoding?: 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'base64' | 'binary' | 'hex';
}

export class AtCommands {

    protected static readonly BASIC_COMMAND_SYNTAX = 'at{x}{n}';
    protected static readonly BASIC_AMPERSAND_COMMAND_SYNTAX = 'at&{x}{n}';

    protected static readonly S_PARAMETER_COMMAND_SYNTAX = 'ats{n}={m}';

    protected static readonly EXTEND_COMMAND_SYNTAX_TEST = 'at+{x}=?';
    protected static readonly EXTEND_COMMAND_SYNTAX_READ = 'at+{x}?';
    protected static readonly EXTEND_COMMAND_SYNTAX_WRITE = 'at+{x}={v}';
    protected static readonly EXTEND_COMMAND_SYNTAX_EXECUTION = 'at+{x}';

    protected static readonly COMMAND_RESPONSE_SYNTAX = '\r\n{response}\r\n'; // TODO: regex

    protected static readonly CME_ERROR_SYNTAX = '+CME ERROR: {error}'; // TODO: Regex

    constructor() {

    }

    at(): AtCommand {
        return {
            command: 'at',
            category: CommandCategories.BASIC
        };
    }

    isOk(res: string): boolean {
        return res == 'OK';
    }

    getBasicCommand(x: string, n?: string): AtCommand {
        let command = AtCommands.BASIC_COMMAND_SYNTAX
                .replace('{x}', x)
                .replace('{n}', n || '');

        return {
            command: command,
            category: CommandCategories.BASIC
        };
    }

    getBasicAmpersandCommand(x: string, n?: string): AtCommand {
        let command = AtCommands.BASIC_AMPERSAND_COMMAND_SYNTAX
                .replace('{x}', '&' + x)
                .replace('{n}', n || '');

        return {
            command: command,
            category: CommandCategories.BASIC
        };
    }

    getSParameterCommand(n: string, ...m: string[]): AtCommand {
        let command = AtCommands.S_PARAMETER_COMMAND_SYNTAX
                .replace('{n}', n)
                .replace('{m}', clean(m).join(','));

        return {
            command: command,
            category: CommandCategories.S_PARAMETER
        };
    }

    getExtendedCommandTest(x: string): AtCommand {
        let command = AtCommands.EXTEND_COMMAND_SYNTAX_TEST
                .replace('{x}', x);

        return {
            command: command,
            category: CommandCategories.EXTENDED,
            extended: ExtendCommandModes.TEST
        };
    }

    getExtendedCommandRead(x: string): AtCommand {
        let command = AtCommands.EXTEND_COMMAND_SYNTAX_READ
                .replace('{x}', x);

        return {
            command: command,
            category: CommandCategories.EXTENDED,
            extended: ExtendCommandModes.READ
        };
    }

    getExtendedCommandWrite(x: string, ...v: any[]): AtCommand {
        let command = AtCommands.EXTEND_COMMAND_SYNTAX_WRITE
                .replace('{x}', x)
                .replace('{v}', clean(v).join(','));

        return {
            command: command,
            category: CommandCategories.EXTENDED,
            extended: ExtendCommandModes.WRITE
        };
    }

    getExtendedCommandExecution(x: string): AtCommand {
        let command = AtCommands.EXTEND_COMMAND_SYNTAX_EXECUTION
                .replace('{x}', x);

        return {
            command: command,
            category: CommandCategories.EXTENDED,
            extended: ExtendCommandModes.EXECUTION
        };
    }

    
}
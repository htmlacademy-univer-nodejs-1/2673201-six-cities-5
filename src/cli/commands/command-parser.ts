type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArgs: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const arg of cliArgs) {
      if (arg.startsWith('--')) {
        parsedCommand[arg] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        parsedCommand[currentCommand].push(arg);
      }
    }

    return parsedCommand;
  }
}

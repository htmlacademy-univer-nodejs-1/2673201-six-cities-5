import { Command } from './command.interface.js';
import {TsvReader} from '../../file-reader/tsv-reader.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(..._params: string[]): Promise<void> {
    const [filename] = _params;
    const fileReader = new TsvReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.green(`Cant import the file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}

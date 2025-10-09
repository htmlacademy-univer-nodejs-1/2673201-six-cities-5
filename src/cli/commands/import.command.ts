import { Command } from './command.interface.js';
import chalk from 'chalk';
import {TSVFileReader} from '../../file-reader/tsv-file-reader.js';
import {createOffer} from '../../helpers/offer.js';
import {getErrorMessage} from '../../helpers/common.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.green(`Cant import the file: ${filename}`));
      console.error(getErrorMessage(error));
    }
  }
}

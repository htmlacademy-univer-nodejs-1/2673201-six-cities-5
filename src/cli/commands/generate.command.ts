import {Command} from './command.interface';
import {MockServerData} from '../../types/mockServerData.type';
import {TSVOfferGenerator} from '../../offer-generator/tsv-offer-generate.js';
import {TSVFileWriter} from '../../file-writer/tsv-file-writer.js';
import {getErrorMessage} from '../../helpers/common.js';
import Undici from 'undici';
import fetch = Undici.fetch;

export class GenerateCommand implements Command {
  private initialData!: MockServerData;
  private async load(url: string): Promise<void> {
    try{
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      this.initialData = await res.json() as MockServerData;
    } catch {
      throw new Error(`Cant load data from: ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  }
}

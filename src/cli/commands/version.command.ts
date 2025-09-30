import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import chalk from 'chalk';

type PackageJSONConfig = {
  version: string;
}

function checkForConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    const jsonText = readFileSync(resolve(this.filePath), 'utf8');
    const importedText: unknown = JSON.parse(jsonText);
    if (! checkForConfig(importedText)) {
      throw new Error('Failed to parse json');
    }
    return importedText.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.blue((version)));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));
      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}

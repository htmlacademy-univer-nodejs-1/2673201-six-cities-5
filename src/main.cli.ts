#!/usr/bin/env node
import 'reflect-metadata';
import {CLIApplication} from './cli/commands/cli-application.js';
import {HelpCommand} from './cli/commands/help.command.js';
import {VersionCommand} from './cli/commands/version.command.js';
import {ImportCommand} from './cli/commands/import.command.js';
import {GenerateCommand} from './cli/commands/generate.command.js';

function bootstrap() {
  const cliApp = new CLIApplication();
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();

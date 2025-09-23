#!/usr/bin/env node

import {CLIApplication} from './cli/commands/cli-application.js';
import {HelpCommand} from './cli/commands/help.command.js';
import {VersionCommand} from './cli/commands/version.command.js';
import {ImportCommand} from './cli/commands/import.command.js';

function bootstrap() {
  const cliApp = new CLIApplication();
  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();

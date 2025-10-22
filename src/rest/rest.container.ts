import { Container } from 'inversify';
import {Application} from './rest.application.js';
import {Component} from '../types/component.enum.js';
import {Logger, PinoLogger} from '../logger/index.js';
import {Config, RestConfig, RestSchema} from '../config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}

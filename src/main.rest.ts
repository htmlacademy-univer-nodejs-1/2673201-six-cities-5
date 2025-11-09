import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './rest/index.js';
import {Component} from './types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './modules/user/index.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
  );
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();

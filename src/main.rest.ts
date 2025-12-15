import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './rest/index.js';
import {Component} from './types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './modules/user/index.js';
import {createCommentContainer} from './modules/comment/comment.container.js';
import {createRentOfferContainer} from './rent-offer/rent-offer.container.js';
import {createAuthContainer} from './modules/auth/auth.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createRentOfferContainer(),
    createCommentContainer(),
    createAuthContainer(),
  );

  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}
bootstrap();

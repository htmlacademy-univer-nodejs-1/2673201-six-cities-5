import { inject, injectable } from 'inversify';
import {Request, Response} from 'express';
import { CreateUserRequest } from './create-user-request.type.js';
import { BaseController, HttpMethod } from '../../rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../logger';
import { UserService } from './user-service.interface';
import { Config, RestSchema } from '../../config/index.js';
import { fillDTO } from '../../helpers/common.js';
import { HttpError } from '../../rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { UserRdo } from './rdo/create-user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';
import {ValidateDtoMiddleware} from '../../rest/middleware/validate-dto.middleware.js';
import {CreateUserDto} from './create-user.dto.js';
import {ValidateObjectIdMiddleware} from '../../rest/middleware/validate.middleware.js';
import {UploadFileMiddleware} from '../../rest/middleware/upload-file.middleware.js';
import {LoginUserDto} from './login-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController',
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT'),
    );

    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    const token = '1a2a3a4d5d';

    this.ok(res, {message: `User ${body.email} successfully logged.`, token });
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}

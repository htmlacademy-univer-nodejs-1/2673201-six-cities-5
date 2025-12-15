import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {Logger} from '../../logger';
import {BaseController, HttpMethod} from '../../rest/index.js';
import {Component} from '../../types/component.enum.js';
import {CommentService} from './comment-service.interface.js';
import {HttpError} from '../../rest/errors/http-error.js';
import {fillDTO} from '../../helpers/common.js';
import {RentOfferService} from '../../rent-offer/rent-offer.service.js';
import {CreateCommentRequest} from './create-comment-request.type.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CreateCommentDto} from './create-comment.dto.js';
import {ValidateDtoMiddleware} from '../../rest/middleware/validate-dto.middleware.js';


@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.RentOfferService) private readonly rentOfferService: RentOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.rentOfferService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.rentOfferService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}

import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../helpers/common.js';
import { RentOfferService } from './rent-offer.service.interface.js';
import { Component } from '../types/component.enum.js';
import { CreateRentOfferDto } from './create-rent-offer.dto.js';
import { OfferRdo } from './rdo/create-rent-offer.rdo.js';
import { UpdateOfferDto } from './update-offer.dto.js';
import { HttpError } from '../rest/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '../rest/middleware/validate.middleware.js';
import { EditOfferDto } from './edit-offer.dto.js';
import { DeleteOfferDto } from './delete-offer.dto.js';
import { Logger } from '../logger/index.js';
import { BaseController, HttpMethod } from '../rest/index.js';
import { CommentService } from '../modules/comment/comment-service.interface.js';
import { ValidateDtoMiddleware } from '../rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../rest/middleware/document-exist.middleware.js';
import { DEFAULT_DISCUSSED_OFFER_COUNT, DEFAULT_NEW_OFFER_COUNT } from './offer.constant.js';
import { CommentRdo } from '../modules/comment/rdo/comment.rdo.js';
import {PrivateRouteMiddleware} from '../rest/middleware/private-route.middleware.js';
import {CreateOfferRequest} from './create-rent-offer-request.js';

@injectable()
export class RentOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.RentOfferService) private readonly offerService: RentOfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateRentOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/bundles/new', method: HttpMethod.Get, handler: this.getNew });
    this.addRoute({ path: '/bundles/discussed', method: HttpMethod.Get, handler: this.getDiscussed });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit =
      typeof req.query.limit === 'string'
        ? Number(req.query.limit)
        : undefined;
    const offers = await this.offerService.find(limit);
    const responseData = offers.map((offer) => fillDTO(OfferRdo, offer));
    this.ok(res, responseData);
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params as { offerId: string };
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }


  public async create(req: Request, res: Response): Promise<void> {
    const { body, tokenPayload } = req as CreateOfferRequest;

    const offer = await this.offerService.create({
      ...(body as CreateRentOfferDto),
      author: tokenPayload.id,
    });

    this.created(res, fillDTO(OfferRdo, offer));
  }


  public async update(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params as { offerId: string };
    const updatedOffer = await this.offerService.updateById(offerId, req.body as UpdateOfferDto);
    if (!updatedOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found`, 'RentOfferController',
      );
    }

    const responseData = fillDTO(EditOfferDto, updatedOffer);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params as { offerId: string };
    const existsOffer = await this.offerService.findById(offerId);
    if (!existsOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found`, 'RentOfferController',
      );
    }

    const deletedOffer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    const responseData = fillDTO(DeleteOfferDto, deletedOffer ?? existsOffer);
    this.ok(res, responseData);
  }

  public async getComments(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params as { offerId: string };
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getNew(_req: Request, res: Response): Promise<void> {
    const newOffers = await this.offerService.findNew(DEFAULT_NEW_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, newOffers));
  }

  public async getDiscussed(_req: Request, res: Response): Promise<void> {
    const discussedOffers = await this.offerService.findDiscussed(DEFAULT_DISCUSSED_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, discussedOffers));
  }
}

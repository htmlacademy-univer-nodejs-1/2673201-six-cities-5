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
import {Logger} from '../logger/index.js';
import {BaseController, HttpMethod} from '../rest/index.js';

@injectable()
export class RentOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.RentOfferService)
    private readonly offerService: RentOfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for RentOfferController');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.index, middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create,
    });
  }

  public async index(
    req: Request,
    res: Response,
  ): Promise<void> {
    const limit =
      typeof req.query.limit === 'string'
        ? Number(req.query.limit)
        : undefined;

    const offers = await this.offerService.find(limit);
    const responseData = offers.map((offer) => fillDTO(OfferRdo, offer));

    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<unknown, unknown, CreateRentOfferDto>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, offer);

    this.created(res, responseData);
  }

  public async edit(
    { params, body }: Request<{ offerId: string }, unknown, UpdateOfferDto>,
    res: Response,
  ): Promise<void> {
    const existsOffer = await this.offerService.findById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'RentOfferController',
      );
    }

    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    const responseData = fillDTO(EditOfferDto, updatedOffer);

    this.ok(res, responseData);
  }

  public async delete(
    { params }: Request<{ offerId: string }>,
    res: Response,
  ): Promise<void> {
    const existsOffer = await this.offerService.findById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'RentOfferController',
      );
    }

    const deletedOffer = await this.offerService.deleteById(params.offerId);
    const responseData = fillDTO(DeleteOfferDto, deletedOffer ?? existsOffer);

    this.ok(res, responseData);
  }
}

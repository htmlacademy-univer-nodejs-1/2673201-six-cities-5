import { Request } from 'express';
import { CreateRentOfferDto } from './create-rent-offer.dto.js';

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};

export type CreateOfferRequest = Request<Record<string, string>, unknown, CreateRentOfferDto> & {
  tokenPayload: TokenPayload;
};

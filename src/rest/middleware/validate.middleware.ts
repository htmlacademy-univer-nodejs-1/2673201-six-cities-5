import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IMiddleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  public execute(req: Request, _res: Response, next: NextFunction): void {
    const id = req.params[this.param];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid ObjectId in parameter "${this.param}": ${id}`,
        'ValidateObjectIdMiddleware',
      );
    }

    return next();
  }
}

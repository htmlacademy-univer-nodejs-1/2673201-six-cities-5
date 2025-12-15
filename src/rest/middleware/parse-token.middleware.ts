import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { createSecretKey } from 'node:crypto';
import { IMiddleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import {TokenPayload} from '../../modules/auth/types/TokenPayload.js';


function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    typeof payload === 'object' && payload !== null &&
    'email' in payload && typeof (payload as any).email === 'string' &&
    'name' in payload && typeof (payload as any).firstname === 'string' &&
    'id' in payload && typeof (payload as any).id === 'string'
  );
}

export class ParseTokenMiddleware implements IMiddleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware'
      ));
    }

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = payload;
      }

      return next();
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware'
      ));
    }
  }
}

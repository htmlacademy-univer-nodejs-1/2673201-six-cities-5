import { Request } from 'express';
import {RequestParams} from '../../rest/types/request.params.type.js';
import {RequestBody} from '../../rest/types/request-body.type.js';
import {CreateUserDto} from './create-user.dto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;

import { Request } from 'express';
import {RequestParams} from '../../rest/types/request.params.type.js';
import {RequestBody} from '../../rest/types/request-body.type.js';
import {LoginUserDto} from './login-user.dto.js';


export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

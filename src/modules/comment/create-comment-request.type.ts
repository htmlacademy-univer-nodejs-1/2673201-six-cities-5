import { Request } from 'express';
import {RequestParams} from '../../rest/types/request.params.type.js';
import {RequestBody} from '../../rest/types/request-body.type.js';
import {CreateCommentDto} from './create-comment.dto.js';


export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;

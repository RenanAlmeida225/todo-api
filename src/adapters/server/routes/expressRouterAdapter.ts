import { Request, Response } from 'express';
import { IHttpContext } from '../../../core/shared/iHttpContext';

export class ExpressRouterAdapter implements IHttpContext {
	constructor(private request: Request, private response: Response) {}

	getRequest(): Request {
		return this.request;
	}

	send(status: number, data: any): void {
		this.response.status(status).json(data);
	}
}

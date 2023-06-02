export interface Request {
	body: any;
	params: any;
}

export interface IHttpContext {
	getRequest(): Request;
	send(status: number, data?: any): void;
}

import { Request, Response } from 'express';
import { ITodoService } from '../../../core/todo/model/ITodoService';

export class TodoController {
	#service: ITodoService;
	constructor(service: ITodoService) {
		this.#service = service;
	}
	async save(
		req: Request,
		res: Response,
	): Promise<Response<any, Record<string, any>>> {
		const { task } = req.body;
		if (!task) {
			return res.status(422).json({ error: 'missing param' });
		}
		await this.#service.save({ task });
		return res.status(201).json();
	}
}

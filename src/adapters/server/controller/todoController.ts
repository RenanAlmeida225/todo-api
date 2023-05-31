import { Request, Response } from 'express';
import { ITodoService } from '../../../core/todo/model/ITodoService';

export class TodoController {
	#service!: ITodoService;
	constructor(service: ITodoService) {
		this.#service = service;
	}
	get service(): ITodoService {
		return this.#service;
	}
	async save(
		req: Request,
		res: Response,
	): Promise<Response<any, Record<string, any>>> {
		try {
			const { task } = req.body;
			if (!task) {
				return res.status(422).json({ error: 'missing param' });
			}
			await this.service.save({ task });
			return res.status(201).json();
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ error: 'server error' });
		}
	}
}

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
			if (!task) return res.status(422).json({ error: 'missing param' });
			await this.service.save({ task });
			return res.status(201).json();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: 'server error' });
		}
	}

	async find(
		req: Request,
		res: Response,
	): Promise<Response<any, Record<string, any>>> {
		try {
			const { id } = req.params;
			if (!id) return res.status(422).json({ error: 'missing param' });
			const todo = await this.service.find({ id: Number(id) });
			if (!todo) return res.status(204).json();
			return res.status(200).json(todo);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: 'server error' });
		}
	}

	async list(res: Response): Promise<Response<any, Record<string, any>>> {
		try {
			const todos = await this.service.list();
			if (todos.length == 0) return res.status(204).json();
			return res.status(200).json(todos);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: 'server error' });
		}
	}

	async complete(
		req: Request,
		res: Response,
	): Promise<Response<any, Record<string, any>>> {
		try {
			const { id } = req.params;
			const todo = await this.service.complete({ id: Number(id) });
			if (!todo) return res.status(204).json();
			return res.status(200).json(todo);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: 'server error' });
		}
	}
}

import { IHttpContext } from '../../shared/iHttpContext';
import { ITodoService } from '../model/ITodoService';

export class TodoController {
	#service!: ITodoService;
	constructor(service: ITodoService) {
		this.#service = service;
	}
	get service(): ITodoService {
		return this.#service;
	}
	async save(ctx: IHttpContext): Promise<void> {
		try {
			const { task } = ctx.getRequest().body;
			if (!task) return ctx.send(422, { error: 'missing param' });
			await this.service.save({ task });
			return ctx.send(201);
		} catch (error) {
			console.log(error);
			return ctx.send(500, { error: 'server error' });
		}
	}

	async find(ctx: IHttpContext): Promise<void> {
		try {
			const { id } = ctx.getRequest().params;
			const todo = await this.service.find({ id: Number(id) });
			if (!todo) return ctx.send(404, { error: 'todo not found' });
			return ctx.send(200, todo);
		} catch (error) {
			console.log(error);
			return ctx.send(500, { error: 'server error' });
		}
	}

	async list(ctx: IHttpContext): Promise<void> {
		try {
			const todos = await this.service.list();
			if (todos.length == 0) return ctx.send(404, { error: 'todos not found' });
			return ctx.send(200, todos);
		} catch (error) {
			console.log(error);
			return ctx.send(500, { error: 'server error' });
		}
	}

	async complete(ctx: IHttpContext): Promise<void> {
		try {
			const { id } = ctx.getRequest().params;
			const todo = await this.service.complete({ id: Number(id) });
			if (!todo) return ctx.send(404, { error: 'todo not found' });
			return ctx.send(200, todo);
		} catch (error) {
			console.log(error);
			return ctx.send(500, { error: 'server error' });
		}
	}
	async delete(ctx: IHttpContext): Promise<void> {
		try {
			const { id } = ctx.getRequest().params;
			const todo = await this.service.delete({ id: Number(id) });
			if (!todo) return ctx.send(404, { error: 'todo not found' });
			return ctx.send(200, todo);
		} catch (error) {
			console.log(error);
			return ctx.send(500, { error: 'server error' });
		}
	}
}

import { ITodoService } from '../model/ITodoService';
import { ITodoRepository } from '../model/ItodoRepository';
import { Todo } from '../model/todo';

export class TodoService implements ITodoService {
	#repository: ITodoRepository;
	constructor(repository: ITodoRepository) {
		this.#repository = repository;
	}

	async save({ task }: Pick<Todo, 'task'>): Promise<void> {
		await this.#repository.save({ task, done: false, createAt: Date.now() });
		return;
	}

	async find({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		return await this.#repository.find({ id });
	}

	async list(): Promise<Todo[]> {
		return this.#repository.list();
	}

	async complete({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		const todo = await this.find({ id });
		if (!todo) {
			return null;
		}
		await this.#repository.update({
			id,
			task: todo.task,
			done: !todo.done,
			completeAt: Date.now(),
		});
		return todo;
	}

	async delete({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		const todo = await this.find({ id });
		if (!todo) {
			return null;
		}
		await this.#repository.delete({ id });
		return todo;
	}
}

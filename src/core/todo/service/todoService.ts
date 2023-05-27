import { IDateFormat } from '../../util/model/iDateFormat';
import { ITodoService } from '../model/ITodoService';
import { ITodoRepository } from '../model/ItodoRepository';
import { Todo } from '../model/todo';

export class TodoService implements ITodoService {
	#repository: ITodoRepository;
	#dateFormat: IDateFormat;
	constructor(repository: ITodoRepository, dateFormat: IDateFormat) {
		this.#repository = repository;
		this.#dateFormat = dateFormat;
	}

	async save({ task }: Pick<Todo, 'task'>): Promise<void> {
		const formatDate = this.#dateFormat.format(new Date());
		await this.#repository.save({ task, done: false, createAt: formatDate });
		return;
	}

	async find({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		return await this.#repository.find({ id });
	}

	async list(): Promise<Todo[]> {
		return this.#repository.list();
	}

	async complete({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		const formatDate = this.#dateFormat.format(new Date());
		const todo = await this.find({ id });
		if (!todo) {
			return null;
		}
		await this.#repository.update({
			id,
			task: todo.task,
			done: !todo.done,
			completeAt: formatDate,
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

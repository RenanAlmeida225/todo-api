import { ITodoRepository } from '../../src/core/todo/model/ItodoRepository';
import { Todo } from '../../src/core/todo/model/todo';
import { DateFormart } from '../../src/core/util/dateFormat';

export class TodoRepositoryInMemory implements ITodoRepository {
	todos: Todo[];
	constructor() {
		this.todos = [];
	}
	async save(todo: Omit<Todo, 'id' | 'completeAt'>): Promise<void> {
		this.todos.push({
			id: 1,
			task: todo.task,
			done: todo.done,
			createAt: todo.createAt,
			completeAt: new DateFormart().format(new Date()),
		});
		return;
	}
	async find({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		const todo = this.todos[id - 1];
		return !todo ? null : todo;
	}
	async list(): Promise<Todo[]> {
		return this.todos;
	}
	async update({
		id,
		task,
		done,
		completeAt,
	}: Omit<Todo, 'createAt'>): Promise<void> {
		const todo = this.todos[id - 1];
		todo.task = task;
		todo.done = done;
		todo.completeAt = completeAt;
		return;
	}
	async delete({ id }: Pick<Todo, 'id'>): Promise<void> {
		this.todos = this.todos.slice(id, this.todos.length);
		return;
	}
}

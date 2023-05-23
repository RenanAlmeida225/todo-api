import { Todo } from './todo';

export interface ITodoRepository {
	save(todo: Omit<Todo, 'id' | 'completeAt'>): Promise<void>;
	find({ id }: Pick<Todo, 'id'>): Promise<Todo | null>;
	list(): Promise<Todo[]>;
	update({ id, task, done, completeAt }: Omit<Todo, 'createAt'>): Promise<void>;
	delete({ id }: Pick<Todo, 'id'>): Promise<void>;
}

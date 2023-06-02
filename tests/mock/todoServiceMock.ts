import { ITodoService } from '../../src/core/todo/model/ITodoService';
import { Todo } from '../../src/core/todo/model/todo';

export class todoServiceMock implements ITodoService {
	response: any;
	error: boolean = false;
	async save({ task }: Pick<Todo, 'task'>): Promise<void> {
		if (this.error) throw new Error('error test');
		return this.response;
	}
	async find({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		if (this.error) throw new Error('error test');
		return this.response;
	}
	async list(): Promise<Todo[]> {
		if (this.error) throw new Error('error test');
		return this.response;
	}
	async complete({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		if (this.error) throw new Error('error test');
		return this.response;
	}
	async delete({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		if (this.error) throw new Error('error test');
		return this.response;
	}
}

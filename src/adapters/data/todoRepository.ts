import { createConnection, Connection, FieldPacket } from 'mysql2/promise';
import { ITodoRepository } from '../../core/todo/model/ItodoRepository';
import { Todo } from '../../core/todo/model/todo';
import { IDateFormat } from '../../core/util/model/iDateFormat';

export class TodoRepositoryMysql implements ITodoRepository {
	#dateFormat: IDateFormat;
	constructor(dateFormat: IDateFormat) {
		this.#dateFormat = dateFormat;
	}
	async connection(): Promise<Connection> {
		return await createConnection({
			host: 'localhost',
			user: 'root',
			password: 'password',
			database: 'tododb',
		});
	}
	async save(todo: Omit<Todo, 'id' | 'completeAt'>): Promise<void> {
		const { task, done, createAt } = todo;
		const conn = await this.connection();
		await conn.execute(
			'INSERT INTO todos (task, done, createAt) VALUES (?,?,?);',
			[task, done, createAt],
		);
		return;
	}

	async find({ id }: Pick<Todo, 'id'>): Promise<Todo | null> {
		const conn = await this.connection();
		const [field]: [any, Array<FieldPacket>] = await conn.execute(
			'SELECT * FROM todos WHERE id=?;',
			[id],
		);
		const data = field[0];
		if (!data) {
			return null;
		}
		return {
			id: data.id,
			task: data.task,
			done: data.done == 0 ? false : true,
			createAt: this.#dateFormat.format(data.createAt),
			completeAt: !data.completeAt
				? null
				: this.#dateFormat.format(data.completeAt),
		};
	}
	async list(): Promise<Todo[]> {
		const conn = await this.connection();
		const [field]: [any[], Array<FieldPacket>] = await conn.execute(
			'SELECT * FROM todos;',
		);
		let todos: Todo[] = [];
		field.forEach((data: any) => {
			todos.push({
				id: data.id,
				task: data.task,
				done: data.done == 0 ? false : true,
				createAt: this.#dateFormat.format(data.createAt),
				completeAt: !data.completeAt
					? null
					: this.#dateFormat.format(data.completeAt),
			});
		});
		return todos;
	}

	async update({
		id,
		task,
		done,
		completeAt,
	}: Omit<Todo, 'createAt'>): Promise<void> {
		const conn = await this.connection();
		await conn.execute(
			'UPDATE todos SET task = ?, done = ?, completeAt = ? WHERE id = ?;',
			[task, done, completeAt, id],
		);
		return;
	}
	async delete({ id }: Pick<Todo, 'id'>): Promise<void> {
		const conn = await this.connection();
		await conn.execute('DELETE FROM todos WHERE id = ?;', [id]);
		return;
	}
}

import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import { TodoRepositoryMysql } from '../../../src/adapters/data/todoRepository';
import { DateFormartMock } from '../../mock/DateFormartMock';

const makeSut = () => {
	const dateFormat = new DateFormartMock();
	const sut = new TodoRepositoryMysql(dateFormat);
	return { sut, dateFormat };
};

describe('TodoRepositoryMysql', () => {
	const date = new Date(2000, 1, 1, 13);
	const formatDate = new DateFormartMock().format(date);

	afterEach(async () => {
		const { sut } = makeSut();
		const conn = await sut.connection();
		await conn.execute('TRUNCATE TABLE todos;');
	});
	describe('save', () => {
		it('should return undefined if save todo', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeSut();
			const promise = await sut.save(todo);
			expect(promise).toBeUndefined();
		});
	});

	describe('find', () => {
		it('should return null', async () => {
			const { sut } = makeSut();
			const promise = await sut.find({ id: 1 });
			expect(promise).toBeNull();
		});
		it('should return a todo', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeSut();
			await sut.save(todo);
			const promise = await sut.find({ id: 1 });
			expect(promise).toEqual({ ...todo, id: 1, completeAt: null });
		});
	});

	describe('list', () => {
		it('should return an array []', async () => {
			const { sut } = makeSut();
			const promise = await sut.list();
			expect(promise).toEqual([]);
		});
		it('should return all todos', async () => {
			const todos = [
				{ task: 'any_task', done: false, createAt: formatDate },
				{ task: 'any_task', done: false, createAt: formatDate },
				{ task: 'any_task', done: false, createAt: formatDate },
			];
			const { sut } = makeSut();
			for (let i = 0; i < todos.length; i++) {
				await sut.save(todos[i]);
			}
			const promise = await sut.list();
			expect(promise).toEqual([
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: null,
				},
				{
					id: 2,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: null,
				},
				{
					id: 3,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: null,
				},
			]);
		});
	});

	describe('update', () => {
		it('should changed the task', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeSut();
			await sut.save(todo);
			const promise = await sut.update({
				...todo,
				id: 1,
				completeAt: null,
				task: 'update_task',
			});
			expect(promise).toBeUndefined();
		});
		it('should changed the done', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeSut();
			await sut.save(todo);
			const promise = await sut.update({
				...todo,
				id: 1,
				completeAt: null,
				done: true,
			});
			expect(promise).toBeUndefined();
		});
		it('should changed the completeAt', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeSut();
			await sut.save(todo);
			const promise = await sut.update({
				...todo,
				id: 1,
				completeAt: formatDate,
			});
			expect(promise).toBeUndefined();
		});
	});

	describe('delete', () => {
		it('should delete task', async () => {
			const { sut } = makeSut();
			await sut.save({ task: 'any_task', done: false, createAt: formatDate });
			const promise = await sut.delete({ id: 1 });
			expect(promise).toBeUndefined();
		});
	});
});

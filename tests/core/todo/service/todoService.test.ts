import { it, expect, describe, beforeEach, vi } from 'vitest';
import { TodoService } from '../../../../src/core/todo/service/todoService';
import { TodoRepositoryInMemory } from '../../../mock/todoRepositoryInMemory';
import { DateFormartMock } from '../../../mock/DateFormartMock';

const makeSut = () => {
	const repository = new TodoRepositoryInMemory();
	const sut = new TodoService(repository, new DateFormartMock());
	return { sut, repository };
};

describe('TodoService', () => {
	const date = new Date(2000, 1, 1, 13);
	const formatDate = new DateFormartMock().format(date);
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(date);
	});
	describe('save', () => {
		it('should return void', async () => {
			const { sut, repository } = makeSut();
			const promise = await sut.save({ task: 'any_task' });
			expect(promise).toBeUndefined();
			expect(repository.todos).toEqual([
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
			]);
		});
	});

	describe('find', () => {
		it('should return todo', async () => {
			const todos = [
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 2,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 3,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
			];
			const { sut, repository } = makeSut();
			repository.todos.push(...todos);
			const promise = await sut.find({ id: 1 });
			expect(promise).toEqual(todos[0]);
		});

		it('should return null', async () => {
			const { sut } = makeSut();
			const promise = await sut.find({ id: 1 });
			expect(promise).toBeNull();
		});
	});

	describe('list', () => {
		it('should return []', async () => {
			const { sut } = makeSut();
			const promise = await sut.list();
			expect(promise).toEqual([]);
		});
		it('should return all todos', async () => {
			const todos = [
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 2,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 3,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
			];
			const { sut, repository } = makeSut();
			repository.todos.push(...todos);
			const promise = await sut.list();
			expect(promise).toEqual(todos);
		});
	});

	describe('complete', () => {
		it('should return null', async () => {
			const { sut } = makeSut();
			const promise = await sut.complete({ id: 1 });
			expect(promise).toBeNull();
		});
		it('should return an todo completed', async () => {
			const todo = {
				id: 1,
				task: 'any_task',
				done: false,
				createAt: formatDate,
				completeAt: formatDate,
			};
			const { sut, repository } = makeSut();
			repository.todos.push(todo);
			const promise = await sut.complete({ id: 1 });
			expect(promise).toEqual({ ...todo, done: true });
		});
	});

	describe('delete', () => {
		it('should return null', async () => {
			const { sut } = makeSut();
			const promise = await sut.delete({ id: 1 });
			expect(promise).toBeNull();
		});
		it('should return a todo', async () => {
			const todos = [
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 2,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
				{
					id: 3,
					task: 'any_task',
					done: false,
					createAt: formatDate,
					completeAt: formatDate,
				},
			];
			const { sut, repository } = makeSut();
			repository.todos.push(...todos);
			const promise = await sut.delete({ id: 1 });
			expect(promise).toEqual(todos[0]);
		});
	});
});

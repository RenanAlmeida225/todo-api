import request from 'supertest';
import app from '../../../src/adapters/server/app';
import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest';
import { TodoRepositoryMysql } from '../../../src/adapters/data/todoRepository';
import { DateFormartMock } from '../../mock/DateFormartMock';

function makeRepository() {
	const sut = new TodoRepositoryMysql(new DateFormartMock());
	return { sut };
}

const baseUrl = '/api';

describe('Routes', () => {
	const date = new Date(2000, 1, 1, 13);
	const formatDate = new DateFormartMock().format(date);
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(date);
	});
	afterEach(async () => {
		const { sut } = makeRepository();
		const conn = await sut.connection();
		await conn.execute('TRUNCATE TABLE todos;');
	});
	describe('POST /save', () => {
		it('should return status code 422', async () => {
			const response = await request(app)
				.post(`${baseUrl}/save`)
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(422);
			expect(response.body).toEqual({ error: 'missing param' });
		});
		it('should return status code 201', async () => {
			const response = await request(app)
				.post(`${baseUrl}/save`)
				.send('task=any_task')
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(201);
			expect(response.body).toEqual('');
		});
	});
	describe('GET /find/:id', () => {
		it('should return status code 204 if not finded todo', async () => {
			const response = await request(app)
				.get(`${baseUrl}/find/1`)
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(204);
			expect(response.body).toEqual({});
		});
		it('should return status code 204 if not finded todo', async () => {
			const todo = { task: 'any_task', done: false, createAt: formatDate };
			const { sut } = makeRepository();
			await sut.save(todo);
			const response = await request(app)
				.get(`${baseUrl}/find/1`)
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(200);
			expect(response.body).toEqual({ ...todo, id: 1, completeAt: null });
		});
	});
	describe('GET /list', () => {
		it('should return status code 204 if not finded todo', async () => {
			const response = await request(app)
				.get(`${baseUrl}/list`)
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(204);
			expect(response.body).toEqual({});
		});
		it('should return status code 204 if not finded todo', async () => {
			const todos = [
				{ task: 'any_task', done: false, createAt: formatDate },
				{ task: 'any_task', done: false, createAt: formatDate },
				{ task: 'any_task', done: false, createAt: formatDate },
			];
			const { sut } = makeRepository();
			for (let i = 0; i < todos.length; i++) {
				await sut.save(todos[i]);
			}
			const response = await request(app)
				.get(`${baseUrl}/list`)
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(200);
			expect(response.body).toEqual([
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
});

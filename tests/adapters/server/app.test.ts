import request from 'supertest';
import app from '../../../src/adapters/server/app';
import { it, expect, describe, afterEach } from 'vitest';
import { TodoRepositoryMysql } from '../../../src/adapters/data/todoRepository';
import { DateFormartMock } from '../../mock/DateFormartMock';

function makeRepository() {
	const sut = new TodoRepositoryMysql(new DateFormartMock());
	return { sut };
}

describe('Routes', () => {
	const date = new Date(2000, 1, 1, 13);
	const formatDate = new DateFormartMock().format(date);
	afterEach(async () => {
		const { sut } = makeRepository();
		const conn = await sut.connection();
		await conn.execute('TRUNCATE TABLE todos;');
	});
	describe('POST /save', () => {
		it('should return status code 422', async () => {
			const response = await request(app)
				.post('/api/save')
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(422);
			expect(response.body).toEqual({ error: 'missing param' });
		});
		it('should return status code 201', async () => {
			const response = await request(app)
				.post('/api/save')
				.send('task=any_task')
				.set('Accept', 'application/json');
			expect(response.statusCode).toEqual(201);
			expect(response.body).toEqual('');
		});
	});
});

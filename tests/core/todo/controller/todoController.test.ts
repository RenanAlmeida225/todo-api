import { it, expect, describe } from 'vitest';
import { TodoController } from '../../../../src/core/todo/controller/todoController';
import { todoServiceMock } from '../../../mock/todoServiceMock';
import {
	IHttpContext,
	Request,
} from '../../../../src/core/shared/iHttpContext';

function makeHttpContext() {
	class HttpContext implements IHttpContext {
		response: any;
		status!: number;
		data?: any;
		getRequest(): Request {
			return {
				params: this.response,
				body: this.response,
			};
		}
		send(status: number, data?: any): void {
			this.status = status;
			this.data = data;
		}
	}
	return new HttpContext();
}

function makeSut() {
	const httpContext = makeHttpContext();
	const service = new todoServiceMock();
	const sut = new TodoController(service);
	return { sut, service, httpContext };
}

describe('TodoController', () => {
	describe('save', () => {
		it('should return status 422 and error', async () => {
			const { sut, httpContext } = makeSut();
			httpContext.response = { task: null };
			await sut.save(httpContext);
			expect(httpContext.status).toEqual(422);
			expect(httpContext.data).toEqual({ error: 'missing param' });
		});
		it('should return status 201 and undefined', async () => {
			const { sut, httpContext } = makeSut();
			httpContext.response = { task: 'any_task' };
			await sut.save(httpContext);
			expect(httpContext.status).toEqual(201);
			expect(httpContext.data).toBeUndefined();
		});
		it('should return status 500 and server error', async () => {
			const { sut, httpContext, service } = makeSut();
			service.error = true;
			httpContext.response = { task: 'any_task' };
			await sut.save(httpContext);
			expect(httpContext.status).toEqual(500);
			expect(httpContext.data).toEqual({ error: 'server error' });
		});
	});
	describe('find', () => {
		it('should return status 404', async () => {
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = null;
			await sut.find(httpContext);
			expect(httpContext.status).toEqual(404);
			expect(httpContext.data).toEqual({ error: 'todo not found' });
		});
		it('should return status 200', async () => {
			const todo = {
				id: 1,
				task: 'any_task',
				done: false,
				createAt: 'date',
				completeAt: 'date',
			};
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = todo;
			await sut.find(httpContext);
			expect(httpContext.status).toEqual(200);
			expect(httpContext.data).toEqual(todo);
		});
	});
	describe('list', () => {
		it('should return status 404', async () => {
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = [];
			await sut.list(httpContext);
			expect(httpContext.status).toEqual(404);
			expect(httpContext.data).toEqual({ error: 'todos not found' });
		});
		it('should return status 200', async () => {
			const todo = [
				{
					id: 1,
					task: 'any_task',
					done: false,
					createAt: 'date',
					completeAt: 'date',
				},
			];
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = todo;
			await sut.find(httpContext);
			expect(httpContext.status).toEqual(200);
			expect(httpContext.data).toEqual(todo);
		});
	});
	describe('complete', () => {
		it('should return status 404', async () => {
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = null;
			await sut.complete(httpContext);
			expect(httpContext.status).toEqual(404);
			expect(httpContext.data).toEqual({ error: 'todo not found' });
		});
		it('should return status 200', async () => {
			const todo = {
				id: 1,
				task: 'update_task',
				done: false,
				createAt: 'date',
				completeAt: 'date',
			};
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = todo;
			await sut.complete(httpContext);
			expect(httpContext.status).toEqual(200);
			expect(httpContext.data).toEqual(todo);
		});
	});
	describe('delete', () => {
		it('should return status 404', async () => {
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = null;
			await sut.delete(httpContext);
			expect(httpContext.status).toEqual(404);
			expect(httpContext.data).toEqual({ error: 'todo not found' });
		});
		it('should return status 200', async () => {
			const todo = {
				id: 1,
				task: 'update_task',
				done: false,
				createAt: 'date',
				completeAt: 'date',
			};
			const { sut, httpContext, service } = makeSut();
			httpContext.response = { id: 1 };
			service.response = todo;
			await sut.delete(httpContext);
			expect(httpContext.status).toEqual(200);
			expect(httpContext.data).toEqual(todo);
		});
	});
});

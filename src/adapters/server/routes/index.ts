import { Router } from 'express';
import { TodoController } from '../../../core/todo/controller/todoController';
import { todoServiceFactory } from '../../factory/todoServiceFactory';
import { ExpressRouterAdapter } from './expressRouterAdapter';

const route = Router();
const todoController = new TodoController(todoServiceFactory());

route.post('/save', (req, res) => {
	const routeAdapter = new ExpressRouterAdapter(req, res);
	todoController.save(routeAdapter);
});
route.get('/find/:id', (req, res) => {
	const routeAdapter = new ExpressRouterAdapter(req, res);
	todoController.find(routeAdapter);
});
route.get('/list', (req, res) => {
	const routeAdapter = new ExpressRouterAdapter(req, res);
	todoController.list(routeAdapter);
});
route.put('/complete/:id', (req, res) => {
	const routeAdapter = new ExpressRouterAdapter(req, res);
	todoController.complete(routeAdapter);
});
route.delete('/delete/:id', (req, res) => {
	const routeAdapter = new ExpressRouterAdapter(req, res);
	todoController.delete(routeAdapter);
});

export default route;

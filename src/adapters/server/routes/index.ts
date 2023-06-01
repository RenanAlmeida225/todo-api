import { Router } from 'express';
import { TodoController } from '../controller/todoController';
import { todoServiceFactory } from '../../factory/todoServiceFactory';

const route = Router();
const todoController = new TodoController(todoServiceFactory());

route.post('/save', (req, res) => todoController.save(req, res));
route.get('/find/:id', (req, res) => todoController.find(req, res));
route.get('/list', (_req, res) => todoController.list(res));
route.put('/complete/:id', (req, res) => todoController.complete(req, res));
route.delete('/delete/:id', (req, res) => todoController.delete(req, res));

export default route;

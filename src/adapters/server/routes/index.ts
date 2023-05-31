import { Router } from 'express';
import { TodoController } from '../controller/todoController';
import { todoServiceFactory } from '../../factory/todoServiceFactory';

const route = Router();
const todoController = new TodoController(todoServiceFactory());

route.post('/save', (req, res) => todoController.save(req, res));

export default route;

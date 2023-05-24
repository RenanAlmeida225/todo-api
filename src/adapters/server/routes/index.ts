import { Router } from 'express';
import { TodoController } from '../controller/todoController';
import { todoServiceFactory } from '../../factory/todoServiceFactory';

const route = Router();

const todoService = todoServiceFactory();
const todoController = new TodoController(todoService);

route.post('/save', todoController.save);

export default route;

import { ITodoService } from '../../core/todo/model/ITodoService';
import { TodoService } from '../../core/todo/service/todoService';
import { DateFormart } from '../../core/util/dateFormat';
import { TodoRepositoryMysql } from '../data/todoRepository';

export function todoServiceFactory(): ITodoService {
	const formatDate = new DateFormart();
	const repository = new TodoRepositoryMysql(formatDate);
	return new TodoService(repository, formatDate);
}

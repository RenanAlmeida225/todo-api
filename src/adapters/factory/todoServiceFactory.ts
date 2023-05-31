import { TodoService } from '../../core/todo/service/todoService';
import { DateFormart } from '../../core/util/dateFormat';
import { TodoRepositoryMysql } from '../data/todoRepository';

export function todoServiceFactory() {
	const formatDate = new DateFormart();
	const repository = new TodoRepositoryMysql(formatDate);
	return new TodoService(repository, formatDate);
}

import { Todo } from "./todo";

export interface ITodoService{
    save({task}:Pick<Todo, 'task'>):Promise<void>
    find({id}:Pick<Todo, 'id'>):Promise<Todo|null>
    list():Promise<Todo[]>
    update({id, task, done}:Todo):Promise<Todo|null>
    delete({id}:Todo):Promise<void>
}
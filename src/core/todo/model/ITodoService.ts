import { Todo } from "./todo";

export interface ITodoService{
    save({task}:Pick<Todo, 'task'>):Promise<void>
    list():Promise<Todo[]>
    update({id, task, done}:Todo):Promise<void>
    delete({id}:Todo):Promise<void>
}
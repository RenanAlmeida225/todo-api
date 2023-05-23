import { Todo } from "./todo";

export interface ITodoRepository{
    save(todo:Omit<Todo, 'id'|'completeAt'>):Promise<void>
    list():Promise<Todo[]>
    update({id, task, done}:Todo):Promise<void>
    delete({id}:Todo):Promise<void>
}
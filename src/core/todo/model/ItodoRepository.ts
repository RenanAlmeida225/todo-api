import { Todo } from "./todo";

export interface ITodoRepository{
    save(todo:Omit<Todo, 'id'|'completeAt'>):Promise<void>
    find({id}:Pick<Todo, 'id'>):Promise<Todo|null>
    list():Promise<Todo[]>
    update({id, task, done}:Omit<Todo, 'createAt'|'completeAt'>):Promise<void>
    delete({id}:Todo):Promise<void>
}
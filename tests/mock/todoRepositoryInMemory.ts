import { ITodoRepository } from "../../src/core/todo/model/ItodoRepository";
import { Todo } from "../../src/core/todo/model/todo";

export class TodoRepositoryInMemory implements ITodoRepository{
    todos:Todo[]
    constructor(){
        this.todos = []
    }
    async save(todo: Omit<Todo, 'id'|'completeAt'>): Promise<void> {
        this.todos.push({id:1, task:todo.task, done:todo.done,createAt:todo.createAt,completeAt:0})
        return
    }
    async find({id}:Pick<Todo, 'id'>):Promise<Todo|null>{
        const todo = this.todos[id-1]
        return !todo?null:todo;
    }
    list(): Promise<Todo[]> {
        throw new Error("Method not implemented.");
    }
    update({ id, task, done }: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
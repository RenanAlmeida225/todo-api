import { ITodoService } from "../model/ITodoService";
import { ITodoRepository } from "../model/ItodoRepository";
import { Todo } from "../model/todo";

export class TodoService implements ITodoService{
    #repository:ITodoRepository;
    constructor(repository:ITodoRepository){
        this.#repository = repository;
    }

    async save({task}: Pick<Todo, 'task'>): Promise<void> {
        this.#repository.save({task, done:false, createAt:Date.now()})
        return
    }
    async list(): Promise<Todo[]> {
        throw new Error("Method not implemented.");
    }
    async update({ id, task, done }: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete({ id }: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
import { it, expect, describe, beforeAll, vi, afterAll } from 'vitest'
import { TodoService } from '../../../../src/core/todo/service/todoService'
import { TodoRepositoryInMemory } from '../../../mock/todoRepositoryInMemory'

const makeSut=()=>{
    const repository = new TodoRepositoryInMemory()
    const sut= new TodoService(repository)
    return{sut, repository}
}

describe("tests", ()=>{
    beforeAll(() => {
        vi.useFakeTimers()
        const date = new Date(2000, 1, 1, 13)
        vi.setSystemTime(date)
    })

    afterAll(() => {
        vi.useRealTimers()
    })

    describe('save', () => {
        it('should return void', async () => {
            const {sut, repository} = makeSut()
            const promise = await sut.save({task:"any_task"})
            expect(promise).toBeUndefined()
            expect(repository.todos).toEqual([{id:1, task:"any_task", done:false, createAt:Date.now(), completeAt:0}])
        })
    })

    describe('find', () => {
        it('should return todo', async () => {
            const todos =[
                {id:1, task:"any_task", done:false, createAt:Date.now(), completeAt:0},
                {id:2, task:"any_task", done:false, createAt:Date.now(), completeAt:0},
                {id:3, task:"any_task", done:false, createAt:Date.now(), completeAt:0}
            ]
            const {sut, repository} = makeSut()
            repository.todos.push(...todos)
            const promise = await sut.find({id:1})
            expect(promise).toEqual(todos[0])
        })
        it('should return null', async () => {
            const {sut} = makeSut()
            const promise = await sut.find({id:1})
            expect(promise).toBeNull()
        })
    })

    describe('update', () => {
        
    })
})
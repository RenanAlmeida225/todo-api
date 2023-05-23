import { it, expect, describe, beforeAll, vi, beforeEach, afterEach } from 'vitest'
import { TodoService } from '../../../../src/core/todo/service/todoService'
import { TodoRepositoryInMemory } from '../../../mock/todoRepositoryInMemory'

const makeSut=()=>{
    const repository = new TodoRepositoryInMemory()
    const sut= new TodoService(repository)
    return{sut, repository}
}

describe("tests", ()=>{
    beforeEach(() => {
        vi.useFakeTimers()
        const date = new Date(2000, 1, 1, 13)
        vi.setSystemTime(date)
    })

    afterEach(() => {
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
    
})
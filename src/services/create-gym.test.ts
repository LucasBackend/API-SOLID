import {expect, describe, it, beforeEach} from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository:inMemoryGymsRepository
let sut:CreateGymUseCase

describe('Register Gym', ()=>{

    beforeEach(()=>{

      gymsRepository = new inMemoryGymsRepository()
      sut = new CreateGymUseCase(gymsRepository)

    })
  

  it('should be able to register', async ()=> {

    const {gym} =  await sut.execute({
      title: 'JavaScripts Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672
    })

    expect(gym.id).toEqual(expect.any(String))


  })
})
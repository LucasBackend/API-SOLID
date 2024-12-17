import {expect, describe, it, beforeEach} from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let GymsRepository: inMemoryGymsRepository
let sut:FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', ()=>{

    beforeEach(async ()=>{
     
      GymsRepository = new inMemoryGymsRepository();
      sut = new FetchNearbyGymsUseCase(GymsRepository)    

    })

  it('should be able to  fetch nearby gyms', async ()=> {
    await GymsRepository.create({
    title:'Near Gym',
    description: null,
    phone: null,
    latitude: -27.2092052,
    longitude: -49.6401091
    })

    await GymsRepository.create({
      title:'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501
    })

    const {gyms} =  await sut.execute({
      user_latitude: -27.2092052,
      user_longitude: -49.6401091
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title:'Near Gym'})
    ])

  })

})

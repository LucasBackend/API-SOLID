import {expect, describe, it, beforeEach} from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let GymsRepository: inMemoryGymsRepository
let sut:SearchGymUseCase

describe('Search Gyms Use Case', ()=>{

    beforeEach(async ()=>{
     
      GymsRepository = new inMemoryGymsRepository();
      sut = new SearchGymUseCase(GymsRepository)    

    })

  it('should be able to search for gyms', async ()=> {
    await GymsRepository.create({
    title:'JavaScript Gym',
    description: null,
    phone: null,
    latitude: -27.0747279,
    longitude: -49.4889672
    })

    await GymsRepository.create({
      title:'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672
    })


    const {gyms} =  await sut.execute({
      query: 'JavaScript',
      page:1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title:'JavaScript Gym'})
    ])

  })

  it('should be able to fetch paginated gym search', async ()=> {
    for( let i =1 ; i<=22;i++){
      await GymsRepository.create({
        title:`JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude: -49.4889672
        })
    }

    const {gyms} =  await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title:'JavaScript Gym 21'}),
      expect.objectContaining({title:'JavaScript Gym 22'})
    ])

  })

})

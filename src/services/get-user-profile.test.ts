import {expect, describe, it, beforeEach} from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from '@/error/resource-not-found-error'

let userRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', ()=>{

  beforeEach(()=>{    
    userRepository = new inMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)    
    })


  it('should be able to get user profile', async ()=> {

    const createUser  = await userRepository.create({
      name:"John doe",
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6) ,
      
    })

    const {user} =  await sut.execute({
      userID: createUser.id
    })

    expect(user.name).toEqual("John doe")


  })

  it('should not be able to get user profile with wrong id', async ()=> {

    await expect(()=>

        sut.execute({
        userID: 'non-existing-id'
      })

    ).rejects.toBeInstanceOf(ResourceNotFoundError)


  })

})
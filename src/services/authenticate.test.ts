import {expect, describe, it, beforeEach} from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/error/invalid-credentials-error'

let userRepository:inMemoryUsersRepository
let sut:AuthenticateUseCase

describe('Authenticate Use Case', ()=>{

  beforeEach(()=>{
    
    userRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
    
    
    })


  it('should be able to authenticate', async ()=> {

    await userRepository.create({
      name:"John doe",
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6) ,
      
    })

    const {user} =  await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))


  })

  it('should not be able to authenticate with wrong email', async ()=> {

    await expect(()=>
        sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })

    ).rejects.toBeInstanceOf(InvalidCredentialsError)


  })

  it('should not be able to authenticate with wrong password', async ()=> {

   await userRepository.create({
      name:"John doe",
      email: 'johndoe@example.com',
      password_hash: await hash('1234567', 6) ,
      
    })

    await expect(()=>

        sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })

    ).rejects.toBeInstanceOf(InvalidCredentialsError)


  })


})
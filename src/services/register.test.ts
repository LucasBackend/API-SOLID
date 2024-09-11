import {expect, describe, it} from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/error/user-already-exists-error'


describe('Register Use Case', ()=>{

  it('should be able to register', async ()=> {

    const userRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(userRepository)

    const {user} =  await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))


  })

  it('should hash user password upon registration', async ()=> {

    const userRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(userRepository)

    const {user} =  await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)


  })

  it('should not be able to register with same email twice', async ()=> {

    const userRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(userRepository)

    const email =  'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

     await expect(()=>
      
      registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })
  
  
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    

    


  })
})
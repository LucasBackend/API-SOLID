import { UserAlreadyExistsError } from "@/error/user-already-exists-error";
import { usersRepository } from "@/repositories/prisma/users-repository";
import { User } from "@prisma/client";
import {hash} from 'bcryptjs'

interface RegisterUseCaseRequest {
  name:string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

//SOLID

// D - DEPENDENCY INVERSION PRINCIPLE

export class RegisterUseCase{
  constructor(private usersRepository:usersRepository){}

  async execute({
    name,
    email,
    password
  }:RegisterUseCaseRequest):Promise<RegisterUseCaseResponse>/*DEVOLVE UMA PROMISE COM USUARIO E TYPA A ENTRADA*/ {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

  
    if (userWithSameEmail){
      throw new UserAlreadyExistsError()
    }
   
    const user  = await this.usersRepository.create({
      name,
      email,
      password_hash
    }
      
    )

    return {
      user,
    }
  
    
  }


}


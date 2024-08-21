import { UserAlreadyExistsError } from "@/error/user-already-exists-error";
import { prisma } from "@/lib/prisma";
import { usersRepository } from "@/repositories/prisma/users-repository";
import {hash} from 'bcryptjs'

interface RegisterUseCaseRequest {
  name:string
  email: string
  password: string
}

//SOLID

// D - DEPENDENCY INVERSION PRINCIPLE

export class RegisterUseCase{
  constructor(private usersRepository:usersRepository){}

  async execute({
    name,
    email,
    password
  }:RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

  
    if (userWithSameEmail){
      throw new UserAlreadyExistsError()
    }
   
    await this.usersRepository.create({
      name,
      email,
      password_hash
    }
      
    )
  
    
  }


}


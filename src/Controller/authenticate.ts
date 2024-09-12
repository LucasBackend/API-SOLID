import { FastifyRequest,FastifyReply } from "fastify"
import { z } from "zod"
import { UsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/services/authenticate"
import { InvalidCredentialsError } from "@/error/invalid-credentials-error"


export async function authenticate(request:FastifyRequest,reply:FastifyReply){
  
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
 
  const {email, password} = registerBodySchema.parse(request.body)

  try{
    const usersRepository = new UsersRepository()

    const registerUseCase = new AuthenticateUseCase(usersRepository)

    const user = await registerUseCase.execute({
      email,
      password
    })

    return reply.status(201).send({user})

  }catch(err){
    if(err instanceof InvalidCredentialsError){
      return reply.status(401).send({message:err.message})
    }

    throw err


  }
  

  
}
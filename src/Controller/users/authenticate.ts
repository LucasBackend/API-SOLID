import { FastifyRequest,FastifyReply } from "fastify"
import { z } from "zod"
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case"
import { InvalidCredentialsError } from "@/error/invalid-credentials-error"


export async function authenticate(request:FastifyRequest,reply:FastifyReply){
  
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
 
  const {email, password} = registerBodySchema.parse(request.body)

  try{

    const authenticateUseCase = makeAuthenticateUseCase()

    const {user} = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign({
      role: user.role
    },{
      sign:{
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign({
      role: user.role
    },{
      sign:{
        sub: user.id,
        expiresIn:'7d'
      }
    })

    return reply
    .setCookie('refreshToken',refreshToken,{
      path:'/',
      secure: true,
      sameSite: true,
      httpOnly:true
    })
    .status(201)
    .send({"token":token})

  }catch(err){
    if(err instanceof InvalidCredentialsError){
      return reply.status(401).send({message:err.message})
    }

    throw err


  }
  

  
}
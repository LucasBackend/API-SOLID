import { register } from '@/Controller/register'
import { authenticate } from '@/Controller/authenticate'
import {FastifyInstance} from 'fastify'

export async function appRoutes(app:FastifyInstance){
  
  app.post('/users',register)

  app.post('/sessions',authenticate)

}
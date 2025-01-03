import { register } from '@/Controller/register'
import { authenticate } from '@/Controller/authenticate'
import {FastifyInstance} from 'fastify'
import { profile } from '@/Controller/profile';
import { verifyJWT } from '@/middleware/verify-jwt';


export async function appRoutes(app:FastifyInstance){
  
  app.post('/users',register);
  app.post('/sessions',authenticate);

  /**Authenticated */
  app.get('/me',{onRequest:[verifyJWT]},profile)

}
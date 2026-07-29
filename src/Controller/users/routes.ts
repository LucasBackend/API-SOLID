import { register } from '@/Controller/users/register'
import { authenticate } from '@/Controller/users/authenticate'
import {FastifyInstance} from 'fastify'
import { profile } from '@/Controller/users/profile';
import { verifyJWT } from '@/middleware/verify-jwt';


export async function usersRoutes(app:FastifyInstance){
  
  app.post('/users',register);
  app.post('/sessions',authenticate);

  /**Authenticated */
  app.get('/me',{onRequest:[verifyJWT]},profile)

}
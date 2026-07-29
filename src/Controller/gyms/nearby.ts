import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod" ;
import { makeFetchNearbyGymsUseCase } from "@/services/factories/make-fetch-nearby-gyms-use-case";


export async function nearby (request:FastifyRequest,reply:FastifyReply){
  const nearByGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value=>{
        return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value=>{
        return Math.abs(value) <=180
    })
  }) 

  const {latitude,longitude} = nearByGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const {gyms} = await fetchNearbyGymsUseCase.execute({
        user_latitude:latitude,
        user_longitude: longitude
    })

    return reply.status(200).send({
        gyms
    })
}
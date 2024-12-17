import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { Gym } from "@prisma/client";


interface FetchNearbyGymsUseCaseRequest {
  user_latitude: number,
  user_longitude:number
  
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase{
  constructor(private gymsRepository:GymsRepository){}

  async execute({
    user_latitude,
    user_longitude
  }:FetchNearbyGymsUseCaseRequest):Promise<FetchNearbyGymsUseCaseResponse>{
      
    const gyms  = await this.gymsRepository.findManyNearby({
      latitude: user_latitude,
      longitude: user_longitude
    })

    return {
      gyms      
    }
  
    
  }


}


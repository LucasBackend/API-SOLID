import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { Gym } from "@prisma/client";


interface CreateGymUseCaseRequest {
  title:string,
  description: string | null
  phone: string | null
  latitude: number,
  longitude: number
  
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

//SOLID

// D - DEPENDENCY INVERSION PRINCIPLE

export class CreateGymUseCase{
  constructor(private gymsRepository:GymsRepository){}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }:CreateGymUseCaseRequest):Promise<CreateGymUseCaseResponse>/*DEVOLVE UMA PROMISE COM USUARIO E TYPA A ENTRADA*/ {
      
    const gym  = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    }
      
    )

    return {
      gym      
    }
  
    
  }


}


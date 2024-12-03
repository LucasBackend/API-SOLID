import { ResourceNotFoundError } from "@/error/resource-not-found-error";
import { usersRepository } from "@/repositories/prisma/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface GetUserProfileUseCaseRequest{
  userID: string
}

interface GetUserProfileUseCaseResponse {
  
  user: User

} 

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: usersRepository,
  ){}

  async execute({userID}:GetUserProfileUseCaseRequest):Promise<GetUserProfileUseCaseResponse>{

    const user = await this.usersRepository.findById(userID)

    if (!user){
      throw new ResourceNotFoundError()
    }

    return {
      user
    }

  }
}
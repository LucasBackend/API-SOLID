import { LateCheckInValidationError } from "@/error/late-check-in-validation-error";
import { ResourceNotFoundError } from "@/error/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

interface ValidatedUseRequest{
  checkInId:string,
}

interface ValidatedUseResponse {
  checkIn: CheckIn
} 

export class ValidatedUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ){}

  async execute({
    checkInId
  }:ValidatedUseRequest):Promise<ValidatedUseResponse>{

    const checkIn = await this.checkInsRepository.findById(checkInId)

  if (!checkIn){
     throw new ResourceNotFoundError()
  }

    const distanceInMinutosFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if(distanceInMinutosFromCheckInCreation>20){
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }

  }
}
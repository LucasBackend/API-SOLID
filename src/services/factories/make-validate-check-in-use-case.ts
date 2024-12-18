import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidatedUseCase } from "../validated-check-in"

export function makeValidateCheckInUseCase(){
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new ValidatedUseCase(checkInsRepository)

  return useCase
}
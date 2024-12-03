import { UsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/services/authenticate"

export function makeAuthenticateUseCase(){
  const usersRepository = new UsersRepository()

  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
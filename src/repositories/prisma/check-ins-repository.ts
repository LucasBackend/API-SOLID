import { CheckIn , Prisma } from "@prisma/client"

export interface CheckInsRepository{
  create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>  
  findById(id:string):Promise<CheckIn | null>
  findManyByUserId(userID:string, page:number):Promise<CheckIn[]>
  countByUserId(userID:string):Promise<number>
  findByUserIdOnDate(userId:string,date:Date):Promise<CheckIn | null>
  save(checkIn:CheckIn):Promise<CheckIn>
}
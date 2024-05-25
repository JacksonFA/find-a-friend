import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  searchByCity(city: string): Promise<Org[]>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}

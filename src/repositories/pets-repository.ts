import { $Enums, Pet, Prisma } from '@prisma/client'

export interface QueryProps {
  age?: $Enums.Age | null
  energy?: $Enums.Energy | null
  size?: $Enums.Size | null
  independence?: $Enums.Independence | null
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(orgIds: string[], query: QueryProps): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(pet: Pet): Promise<Pet>
}

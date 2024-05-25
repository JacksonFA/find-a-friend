import { prisma } from '@/lib/prisma'
import { PetsRepository, QueryProps } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async searchMany(orgIds: string[], query: QueryProps) {
    const filter: any = {
      org_id: {
        in: orgIds,
      },
    }
    if (query.age) filter.age = query.age
    if (query.energy) filter.energy = query.energy
    if (query.independence) filter.independence = query.independence
    if (query.size) filter.size = query.size
    const pet = await prisma.pet.findMany({
      where: filter,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return pet
  }
}

import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma, Pet, $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async searchMany(query: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) return null
    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) return null
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      org_id: data.org_id,
      name: data.name,
      about: data.about,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      size: data.size,
      independence: data.independence,
      photos: data.photos as string[],
      requirements: data.requirements as string[],
      created_at: new Date(),
    }
    this.items.push(pet)
    return pet
  }

  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id)
    if (petIndex >= 0) this.items[petIndex] = pet
    return pet
  }
}

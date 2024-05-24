import { $Enums, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  org_id: string
  name: string
  about: string
  age: $Enums.Age
  size: $Enums.Size
  energy: $Enums.Energy
  independence: $Enums.Independence
  environment: $Enums.Environment
  photos: string[]
  requirements: string[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    org_id,
    name,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    photos,
    requirements,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    if (!org_id) throw new Error('')
    const pet = await this.petsRepository.create({
      org_id,
      name,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      photos,
      requirements,
    })
    return { pet }
  }
}

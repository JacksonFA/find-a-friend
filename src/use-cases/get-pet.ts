import { Org, Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  org: Org
  pet: Pet
}

export class GetPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)
    if (!pet) throw new ResourceNotFoundError()
    const org = await this.orgsRepository.findById(pet.org_id)
    if (!org) throw new ResourceNotFoundError()
    return { org, pet }
  }
}

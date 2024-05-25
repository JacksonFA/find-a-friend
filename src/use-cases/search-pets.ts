import { Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository, QueryProps } from '@/repositories/pets-repository'
import { CityIsObligatoryError } from './errors/city-is-obligatory-error'

type QueryInput = { city: string } & QueryProps

interface SearchPetsUseCaseRequest {
  query: QueryInput
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    query,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    if (!query.city) throw new CityIsObligatoryError()
    const orgsByCity = await this.orgsRepository.searchByCity(query.city)
    const orgIds = orgsByCity.map((org) => org.id)
    const filter: Omit<QueryInput, 'city'> = query
    const pets = await this.petsRepository.searchMany(orgIds, filter)
    return { pets }
  }
}

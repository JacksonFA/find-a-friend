import { $Enums } from '@prisma/client'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      org_id: '123',
      name: 'Totó',
      about: 'dócil',
      age: $Enums.Age.CUB,
      size: $Enums.Size.SMALL,
      energy: $Enums.Energy.HIGH,
      independence: $Enums.Independence.MEDIUM,
      environment: $Enums.Environment.MEDIUM,
      photos: [],
      requirements: [],
    })
    await petsRepository.create({
      org_id: '123',
      name: 'Totó 2',
      about: 'dócil',
      age: $Enums.Age.CUB,
      size: $Enums.Size.SMALL,
      energy: $Enums.Energy.HIGH,
      independence: $Enums.Independence.MEDIUM,
      environment: $Enums.Environment.MEDIUM,
      photos: [],
      requirements: [],
    })
    const { pets } = await sut.execute({ query: 'Totó' })
    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Totó' })])
  })
})

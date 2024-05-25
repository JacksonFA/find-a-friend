import { $Enums } from '@prisma/client'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(orgsRepository, petsRepository)
  })

  it('should be able to search for pets', async () => {
    const org = await orgsRepository.create({
      address: 'Unit test',
      cep: '123',
      city: 'Florianópolis',
      email: 'johndoe@example.com',
      latitude: 123,
      longitude: 123,
      password_hash: '123456',
      phone: '',
      responsible: 'John Doe',
    })
    await petsRepository.create({
      org_id: org.id,
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
      org_id: org.id,
      name: 'Totó 2',
      about: 'dócil',
      age: $Enums.Age.ADULT,
      size: $Enums.Size.MEDIUM,
      energy: $Enums.Energy.HIGH,
      independence: $Enums.Independence.MEDIUM,
      environment: $Enums.Environment.MEDIUM,
      photos: [],
      requirements: [],
    })
    const query = {
      city: 'Florianópolis',
      age: $Enums.Age.CUB,
      size: $Enums.Size.SMALL,
    }
    const { pets } = await sut.execute({ query })
    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Totó' })])
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetPetUseCase } from '@/use-cases/get-pet'
import { $Enums } from '@prisma/client'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to get pet', async () => {
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
    const createdPet = await petsRepository.create({
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
    const { pet } = await sut.execute({
      petId: createdPet.id,
    })
    expect(pet.name).toEqual('Totó')
  })

  it('should not be able to get pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get pet with wrong org id', async () => {
    const createdPet = await petsRepository.create({
      org_id: 'non-existing-id',
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
    await expect(() =>
      sut.execute({
        petId: createdPet.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

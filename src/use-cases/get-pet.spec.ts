import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetPetUseCase } from '@/use-cases/get-pet'
import { $Enums } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet', async () => {
    const createdPet = await petsRepository.create({
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
})

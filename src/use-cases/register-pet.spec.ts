import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { $Enums } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should to register a pet', async () => {
    const { pet } = await sut.execute({
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
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register without a org', async () => {
    await expect(() =>
      sut.execute({
        org_id: '',
        name: 'Totó',
        about: 'dócil',
        age: $Enums.Age.CUB,
        size: $Enums.Size.SMALL,
        energy: $Enums.Energy.HIGH,
        independence: $Enums.Independence.MEDIUM,
        environment: $Enums.Environment.MEDIUM,
        photos: [],
        requirements: [],
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

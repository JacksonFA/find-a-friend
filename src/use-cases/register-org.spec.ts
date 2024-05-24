import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should to register a org', async () => {
    const { org } = await sut.execute({
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '4899999999',
      cep: '123345',
      address: 'Unit Test',
      latitude: 123,
      longitude: 123,
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '4899999999',
      cep: '123345',
      address: 'Unit Test',
      latitude: 123,
      longitude: 123,
    })
    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'
    await sut.execute({
      responsible: 'John Doe',
      email,
      password: '123456',
      phone: '4899999999',
      cep: '123345',
      address: 'Unit Test',
      latitude: 123,
      longitude: 123,
    })
    await expect(() =>
      sut.execute({
        responsible: 'John Doe',
        email,
        password: '123456',
        phone: '4899999999',
        cep: '123345',
        address: 'Unit Test',
        latitude: 123,
        longitude: 123,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})

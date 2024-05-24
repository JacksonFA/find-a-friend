import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  responsible: string
  email: string
  password: string
  phone: string
  cep: string
  address: string
  latitude: number
  longitude: number
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsible,
    email,
    password,
    phone,
    cep,
    address,
    latitude,
    longitude,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    if (orgWithSameEmail) throw new OrgAlreadyExistsError()
    const org = await this.orgsRepository.create({
      responsible,
      email,
      password_hash,
      phone,
      cep,
      address,
      latitude,
      longitude,
    })
    return { org }
  }
}

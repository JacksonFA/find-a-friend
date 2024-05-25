import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { AddressIsObligatoryError } from './errors/address-is-obligatory-error'
import { PhoneIsObligatoryError } from './errors/phone-is-obligatory-error'

interface RegisterOrgUseCaseRequest {
  responsible: string
  email: string
  password: string
  phone: string
  cep?: string | null
  address: string
  city: string
  latitude?: number | null
  longitude?: number | null
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
    city,
    latitude,
    longitude,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    if (!city || !address) throw new AddressIsObligatoryError()
    if (!phone) throw new PhoneIsObligatoryError()
    const password_hash = await hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    if (orgWithSameEmail) throw new OrgAlreadyExistsError()
    const org = await this.orgsRepository.create({
      responsible,
      email,
      password_hash,
      phone,
      cep: cep ?? '',
      address,
      city,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
    })
    return { org }
  }
}

import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)
    if (!org) return null
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)
    if (!org) return null
    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      responsible: data.responsible,
      email: data.email,
      password_hash: data.password_hash,
      phone: String(data.phone),
      cep: data.cep,
      address: data.address,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      created_at: new Date(),
    }
    this.items.push(org)
    return org
  }
}

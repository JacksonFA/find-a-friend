import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cep: '213456',
      address: 'e2e Tests',
      latitude: 123,
      longitude: 123,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}

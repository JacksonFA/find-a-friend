import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.org.create({
      data: {
        responsible: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123',
        password_hash: await hash('123456', 6),
        cep: '213456',
        address: 'e2e Tests',
        city: 'Florianópolis',
        latitude: 123,
        longitude: 123,
      },
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

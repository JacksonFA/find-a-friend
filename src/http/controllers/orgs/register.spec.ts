import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      responsible: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '123',
      cep: '213456',
      address: 'e2e Tests',
      city: 'Florianópolis',
    })
    expect(response.statusCode).toEqual(201)
  })
})

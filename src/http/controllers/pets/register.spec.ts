import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const org = await prisma.org.findFirstOrThrow()
    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
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

    expect(response.statusCode).toEqual(201)
  })
})

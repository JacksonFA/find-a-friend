import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'
import { $Enums } from '@prisma/client'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()
    const pet = await prisma.pet.create({
      data: {
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
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})

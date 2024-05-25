import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { $Enums } from '@prisma/client'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    org_id: z.string(),
    name: z.string(),
    about: z.string(),
    age: z.enum([$Enums.Age.ADULT, $Enums.Age.CUB]),
    size: z.enum([$Enums.Size.LARGE, $Enums.Size.MEDIUM, $Enums.Size.SMALL]),
    energy: z.enum([
      $Enums.Energy.HIGH,
      $Enums.Energy.LOW,
      $Enums.Energy.MEDIUM,
    ]),
    independence: z.enum([
      $Enums.Independence.HIGH,
      $Enums.Independence.LOW,
      $Enums.Independence.MEDIUM,
    ]),
    environment: z.enum([
      $Enums.Environment.WIDE,
      $Enums.Environment.SMALL,
      $Enums.Environment.MEDIUM,
    ]),
    photos: z.array(z.string()),
    requirements: z.array(z.string()),
  })

  const data = registerBodySchema.parse(request.body)
  const registerUseCase = makeRegisterPetUseCase()
  await registerUseCase.execute(data)
  return reply.status(201).send()
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    cep: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrgUseCase()

    await registerUseCase.execute(data)
  } catch (err: any) {
    console.log(err)
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}

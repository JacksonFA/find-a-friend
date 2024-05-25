import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getBodySchema = z.object({
    id: z.string(),
  })

  const data = getBodySchema.parse(request.params)
  const getUseCase = makeGetPetUseCase()
  const result = await getUseCase.execute(data)
  return reply.status(200).send(result)
}

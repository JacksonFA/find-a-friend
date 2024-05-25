import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { $Enums } from '@prisma/client'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchBodySchema = z.object({
    city: z.string(),
    age: z.enum([$Enums.Age.ADULT, $Enums.Age.CUB]).nullish(),
    size: z
      .enum([$Enums.Size.LARGE, $Enums.Size.MEDIUM, $Enums.Size.SMALL])
      .nullish(),
    energy: z
      .enum([$Enums.Energy.HIGH, $Enums.Energy.LOW, $Enums.Energy.MEDIUM])
      .nullish(),
    independence: z
      .enum([
        $Enums.Independence.HIGH,
        $Enums.Independence.LOW,
        $Enums.Independence.MEDIUM,
      ])
      .nullish(),
  })
  const data = searchBodySchema.parse(request.query)
  const searchUseCase = makeSearchPetsUseCase()
  const result = await searchUseCase.execute({ query: data })
  return reply.status(200).send(result)
}

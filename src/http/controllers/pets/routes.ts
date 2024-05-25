import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { search } from './search'
import { get } from './get'


export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/pets', search)
  app.get('/pets/:id', get)
  app.post('/pets', register)
}

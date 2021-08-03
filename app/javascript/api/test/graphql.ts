import { makeExecutableSchema } from 'graphql-tools'
import { validate } from 'graphql'

import fs from 'fs'
import path from 'path'

const schemaPath = path.resolve(__dirname, '../schema.graphql')

if (!fs.existsSync(schemaPath)) {
  throw new Error(`Missing schema.graphql file at: ${schemaPath}`)
}

const schemaBody = fs.readFileSync(schemaPath, { encoding: 'utf8' })

/**
 * Check if query is ok
 * @param document
 */
export function validateQuery(document) {
  const validatableSchema = makeExecutableSchema({
    typeDefs: schemaBody,
    resolvers: {},
  })

  const errorArray = validate(validatableSchema, document)
  return errorArray
}

import { z } from 'zod'

const BadRequestErrorItemSchema = z.object({
  validation: z.string().describe('The type of validation that failed (e.g., "uuid")'),
  code: z.string().describe('The error code (e.g., "invalid_string")'),
  message: z.string().describe('Human-readable message describing the validation error'),
  path: z.array(z.string()).describe('Path to the field that caused the error'),
})

export const BadRequestErrorSchema = z.object({
  statusCode: z.literal(400).describe('HTTP status code for Bad Request'),
  message: z.string().describe('General error message'),
  errors: z.array(BadRequestErrorItemSchema).describe('List of detailed validation errors'),
})

export const NotFoundRequestErrorSchema = z.object({
  statusCode: z.literal(404).describe('HTTP status code for Not Found'),
  error: z.string().describe('General error message'),
  message: z.string().describe('Detailed error message'),
})

export const InternalServerErrorSchema = z.object({
  statusCode: z.literal(500).describe('HTTP status code for Internal Server Error'),
  error: z.string().describe('General error message'),
  message: z.string().describe('Detailed error message'),
})

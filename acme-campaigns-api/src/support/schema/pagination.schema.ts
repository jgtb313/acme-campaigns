import { z } from 'zod'

export const OffsetSchema = z.coerce.number().optional().describe('Number of items to skip before starting to collect the result set')

export const LimitSchema = z.coerce.number().optional().describe('Maximum number of items to return in the result set')

export const PaginationSchema = z.object({
  offset: OffsetSchema,
  limit: LimitSchema,
})

export const PaginationResponseSchema = z.object({
  values: z.array(z.any()),
  meta: z.object({
    totalItems: z.number(),
    totalPages: z.number(),
  }),
})

export type Pagination<T> = T & z.infer<typeof PaginationSchema>
export type PaginationResponse<T> = {
  values: T[]
  meta: {
    totalItems: number
    totalPages: number
  }
}

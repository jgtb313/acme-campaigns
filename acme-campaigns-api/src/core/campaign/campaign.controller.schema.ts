import { z } from 'zod'

import { OffsetSchema, LimitSchema } from '@/support/schema'
import { CampaignSchema as Schema, CampaignIdSchema, CampaignNameSchema, CampaignStatusSchema } from '@/core/campaign/campaign.schema'

export const CampaignSchema = Schema.omit({ deletedAt: true })

export const ListCampaignsQuery = {
  name: CampaignNameSchema.optional(),
  status: CampaignStatusSchema.optional(),
  offset: OffsetSchema,
  limit: LimitSchema,
}
export const ListCampaignsQuerySchema = z.object(ListCampaignsQuery)
export type ListCampaignsQueryInput = z.infer<typeof ListCampaignsQuerySchema>

export const GetCampaignParams = {
  campaignId: CampaignIdSchema,
}
export const GetCampaignParamsSchema = z.object(GetCampaignParams)
export type GetCampaignParamsInput = z.infer<typeof GetCampaignParamsSchema>

export const CreateCampaignBodySchema = CampaignSchema.pick({
  name: true,
  category: true,
  startDate: true,
  endDate: true,
})
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be greater than start date.',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return data.startDate >= today
    },
    {
      message: 'Start date must be today or later.',
      path: ['startDate'],
    },
  )
export type CreateCampaignBodyInput = z.infer<typeof CreateCampaignBodySchema>

export const UpdateCampaignParams = {
  campaignId: CampaignIdSchema,
}
export const UpdateCampaignParamsSchema = z.object(UpdateCampaignParams)
export type UpdateCampaignParamsInput = z.infer<typeof UpdateCampaignParamsSchema>
export const UpdateCampaignBodySchema = CampaignSchema.pick({
  name: true,
  category: true,
  startDate: true,
  endDate: true,
})
  .partial()
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate
      }
      return true
    },
    {
      message: 'End date must be greater than start date.',
      path: ['endDate'],
    },
  )
  .refine(
    (data) => {
      if (data.startDate) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return data.startDate >= today
      }
      return true
    },
    {
      message: 'Start date must be today or later.',
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      const hasStart = data.startDate !== undefined
      const hasEnd = data.endDate !== undefined
      return hasStart === hasEnd
    },
    {
      message: 'Both startDate and endDate must be provided together.',
      path: ['startDate', 'endDate'],
    },
  )
export type UpdateCampaignBodyInput = z.infer<typeof UpdateCampaignBodySchema>

export const ActiveCampaignParams = {
  campaignId: CampaignIdSchema,
}
export const ActiveCampaignParamsSchema = z.object(ActiveCampaignParams)
export type ActiveCampaignParamsInput = z.infer<typeof ActiveCampaignParamsSchema>

export const CloseCampaignParams = {
  campaignId: CampaignIdSchema,
}
export const CloseCampaignParamsSchema = z.object(CloseCampaignParams)
export type CloseCampaignParamsInput = z.infer<typeof CloseCampaignParamsSchema>

export const DeleteCampaignParams = {
  campaignId: CampaignIdSchema,
}
export const DeleteCampaignParamsSchema = z.object(DeleteCampaignParams)
export type DeleteCampaignParamsInput = z.infer<typeof DeleteCampaignParamsSchema>

import { z } from 'zod'

export enum CampaignStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
}

export enum CampaignCategory {
  AWARENESS = 'AWARENESS',
  PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
  HOLIDAY = 'HOLIDAY',
  PROMOTION = 'PROMOTION',
  SEASONAL = 'SEASONAL',
  RETENTION = 'RETENTION',
  REFERRAL = 'REFERRAL',
  REENGAGEMENT = 'REENGAGEMENT',
  SOCIAL_IMPACT = 'SOCIAL_IMPACT',
  BRANDING = 'BRANDING',
  LEAD_GENERATION = 'LEAD_GENERATION',
  FEEDBACK = 'FEEDBACK',
  CONVERSION = 'CONVERSION',
  EVENT = 'EVENT',
  EDUCATIONAL = 'EDUCATIONAL',
}

export const CampaignIdSchema = z.string().uuid().describe('Unique identifier for the campaign')

export const CampaignNameSchema = z.string().min(1).describe('Name of the campaign')

export const CampaignCategorySchema = z.nativeEnum(CampaignCategory).describe('Category describing the campaign objective or type')

export const CampaignStartDateSchema = z.coerce.date().describe('Date when the campaign starts')

export const CampaignEndDateSchema = z.coerce.date().describe('Date when the campaign ends')

export const CampaignStatusSchema = z.nativeEnum(CampaignStatus).default(CampaignStatus.ACTIVE).describe('Current status of the campaign')

export const CampaignDeletedAtSchema = z.coerce.date().nullable()

export const CampaignCreatedAtSchema = z.coerce.date().describe('Timestamp when the campaign was created')

export const CampaignUpdatedAtSchema = z.coerce.date().describe('Timestamp when the campaign was last updated')

export const CampaignSchema = z.object({
  campaignId: CampaignIdSchema,
  name: CampaignNameSchema,
  category: CampaignCategorySchema,
  startDate: CampaignStartDateSchema,
  endDate: CampaignEndDateSchema,
  status: CampaignStatusSchema,
  deletedAt: CampaignDeletedAtSchema,
  createdAt: CampaignCreatedAtSchema,
  updatedAt: CampaignUpdatedAtSchema,
})
export type Campaign = z.infer<typeof CampaignSchema>

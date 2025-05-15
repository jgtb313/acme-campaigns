import { z } from "zod";

export enum CampaignStatusEnum {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  EXPIRED = "EXPIRED",
}

export enum CampaignCategoryEnum {
  AWARENESS = "AWARENESS",
  PRODUCT_LAUNCH = "PRODUCT_LAUNCH",
  HOLIDAY = "HOLIDAY",
  PROMOTION = "PROMOTION",
  SEASONAL = "SEASONAL",
  RETENTION = "RETENTION",
  REFERRAL = "REFERRAL",
  REENGAGEMENT = "REENGAGEMENT",
  SOCIAL_IMPACT = "SOCIAL_IMPACT",
  BRANDING = "BRANDING",
  LEAD_GENERATION = "LEAD_GENERATION",
  FEEDBACK = "FEEDBACK",
  CONVERSION = "CONVERSION",
  EVENT = "EVENT",
  EDUCATIONAL = "EDUCATIONAL",
}

export const campaignCategories = Object.values(CampaignCategoryEnum);

export const CampaignSchema = z.object({
  campaignId: z.string().uuid(),
  name: z.string().min(1),
  category: z.nativeEnum(CampaignCategoryEnum),
  startDate: z.string(),
  endDate: z.string(),
  status: z.nativeEnum(CampaignStatusEnum).default(CampaignStatusEnum.ACTIVE),
});
export type Campaign = z.infer<typeof CampaignSchema>;

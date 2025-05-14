import { z } from "zod";

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  EXPIRED = "EXPIRED",
}

export enum CampaignCategory {
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

export const CampaignSchema = z.object({
  campaignId: z.string().uuid(),
  name: z.string().min(1),
  category: z.nativeEnum(CampaignCategory),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  status: z.nativeEnum(CampaignStatus).default(CampaignStatus.ACTIVE),
});
export type Campaign = z.infer<typeof CampaignSchema>;

import { randomUUID } from 'crypto'

import { Campaign, CampaignCategory, CampaignStatus } from '@/core/campaign/campaign.schema'

const now = new Date()
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
const dayAfterTomorrow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

export const makeMockCampaign = (input?: Partial<Campaign>): Campaign => ({
  campaignId: randomUUID(),
  name: 'Test Campaign',
  category: CampaignCategory.PROMOTION,
  startDate: tomorrow,
  endDate: dayAfterTomorrow,
  status: CampaignStatus.ACTIVE,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...input,
})

export const campaignMocks: Campaign[] = [
  makeMockCampaign({
    name: 'Active Campaign (current)',
    startDate: yesterday,
    endDate: dayAfterTomorrow,
    status: CampaignStatus.ACTIVE,
  }),
  makeMockCampaign({
    name: 'Active Campaign (future)',
    startDate: tomorrow,
    endDate: nextWeek,
    status: CampaignStatus.ACTIVE,
  }),
  makeMockCampaign({
    name: 'Expired Campaign',
    startDate: twoDaysAgo,
    endDate: yesterday,
    status: CampaignStatus.EXPIRED,
  }),
  makeMockCampaign({
    name: 'Closed Campaign',
    startDate: twoDaysAgo,
    endDate: tomorrow,
    status: CampaignStatus.CLOSED,
  }),
  makeMockCampaign({
    name: 'Expired Campaign (long ago)',
    startDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    status: CampaignStatus.EXPIRED,
  }),
  makeMockCampaign({
    name: 'Closed Campaign (future)',
    startDate: tomorrow,
    endDate: dayAfterTomorrow,
    status: CampaignStatus.CLOSED,
  }),
  makeMockCampaign({
    name: 'Deleted Active Campaign',
    startDate: yesterday,
    endDate: tomorrow,
    status: CampaignStatus.ACTIVE,
    deletedAt: new Date(),
  }),
]

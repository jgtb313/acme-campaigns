import { Pagination, PaginationResponse } from '@/support/schema'

import { CampaignDomain } from '@/core/campaign/campaign.domain'
import { Campaign } from '@/core/campaign/campaign.schema'

export type ICampaignRepository = {
  findAllPaginated(input: Pagination<Partial<Pick<Campaign, 'name' | 'status'>>>): Promise<PaginationResponse<CampaignDomain>>
  findById(campaignId: string): Promise<CampaignDomain>
  create(input: Campaign): Promise<CampaignDomain>
  updateById(campaignId: string, input: Partial<Campaign>): Promise<CampaignDomain>
  deleteById(campaignId: string): Promise<void>
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { ICampaignRepository } from '@/ports/database'
import { CampaignDomain } from '@/core/campaign/campaign.domain'

@Injectable()
export class CampaignInMemoryRepository implements ICampaignRepository {
  private campaigns = new Map<string, CampaignDomain>()

  findAllPaginated: ICampaignRepository['findAllPaginated'] = async ({ offset = 0, limit = 10, name, status }) => {
    let filtered = Array.from(this.campaigns.values()).filter((campaign) => !campaign.state.deletedAt)

    if (name) {
      filtered = filtered.filter((campaign) => campaign.state.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (status) {
      filtered = filtered.filter((campaign) => campaign.state.status === status)
    }

    const skip = offset ?? 0
    const take = limit ?? 10

    const paginated = filtered.slice(skip, skip + take)

    return {
      values: paginated,
      meta: {
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / take),
      },
    }
  }

  findById: ICampaignRepository['findById'] = async (campaignId) => {
    const campaign = this.campaigns.get(campaignId)

    if (!campaign) {
      throw new NotFoundException(`Campaign ${campaignId} not found`)
    }

    if (campaign.state.deletedAt) {
      throw new NotFoundException(`Campaign ${campaignId} not found`)
    }

    return campaign
  }

  create: ICampaignRepository['create'] = async (input) => {
    const campaign = new CampaignDomain(input)

    this.campaigns.set(campaign.state.campaignId, campaign)

    return campaign
  }

  updateById: ICampaignRepository['updateById'] = async (campaignId, input) => {
    const campaign = await this.findById(campaignId)

    const updatedCampaign = new CampaignDomain({ ...campaign.state, ...input })
    this.campaigns.set(campaignId, updatedCampaign)

    return updatedCampaign
  }

  deleteById: ICampaignRepository['deleteById'] = async (campaignId) => {
    const campaign = this.campaigns.get(campaignId)

    if (!campaign) {
      return
    }

    const updatedCampaign = new CampaignDomain({ ...campaign.state, deletedAt: new Date() })
    this.campaigns.set(campaignId, updatedCampaign)
  }
}

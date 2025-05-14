import { Injectable, Inject } from '@nestjs/common'

import { Pagination } from '@/support/schema'
import { ICampaignRepository } from '@/ports/database'
import { CampaignDomain } from '@/core/campaign/campaign.domain'
import { Campaign } from '@/core/campaign/campaign.schema'

@Injectable()
export class CampaignService {
  constructor(@Inject('CAMPAIGN_REPOSITORY') private readonly campaignRepository: ICampaignRepository) {}

  async listCampaignsPaginated(input: Pagination<Partial<Pick<Campaign, 'name' | 'status'>>>) {
    return this.campaignRepository
      .findAllPaginated(input)
      .then((response) => ({ ...response, values: response.values.map((campaign) => campaign.toPlain()) }))
  }

  async getCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findById(campaignId)

    return campaign.toPlain()
  }

  async createCampaign(input: Omit<Campaign, 'campaignId' | 'status' | 'deletedAt' | 'createdAt' | 'updatedAt'>) {
    const campaign = new CampaignDomain(input)

    const createdCampaign = await this.campaignRepository.create(campaign.state)

    return createdCampaign.toPlain()
  }

  async updateCampaign(campaignId: string, input: Partial<Campaign>) {
    const campaign = await this.campaignRepository.findById(campaignId)

    campaign.update(input)

    const updatedCampaign = await this.campaignRepository.updateById(campaign.state.campaignId, campaign.state)

    return updatedCampaign.toPlain()
  }

  async activeCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findById(campaignId)

    campaign.markAsActive()

    const updatedCampaign = await this.campaignRepository.updateById(campaign.state.campaignId, campaign.state)

    return updatedCampaign.toPlain()
  }

  async closeCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findById(campaignId)

    campaign.markAsClosed()

    const updatedCampaign = await this.campaignRepository.updateById(campaign.state.campaignId, campaign.state)

    return updatedCampaign.toPlain()
  }

  async deleteCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findById(campaignId)

    await this.campaignRepository.deleteById(campaign.state.campaignId)
  }
}

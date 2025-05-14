import { ConflictException } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { CampaignSchema, Campaign, CampaignStatus } from '@/core/campaign/campaign.schema'

export class CampaignDomain {
  state: Campaign

  constructor(campaign: Omit<Campaign, 'campaignId' | 'status' | 'deletedAt' | 'createdAt' | 'updatedAt'> & Partial<Campaign>) {
    this.state = CampaignSchema.parse({
      campaignId: randomUUID(),
      deletedAt: campaign.deletedAt ? campaign.deletedAt : null,
      createdAt: campaign.createdAt ? campaign.createdAt : new Date(),
      updatedAt: campaign.updatedAt ? campaign.updatedAt : new Date(),
      ...campaign,
    })

    if (this.isExpired()) {
      this.markAsExpired()
    }
  }

  update(input: Partial<Campaign>) {
    this.state = {
      ...this.state,
      ...input,
    }

    if (this.isExpired()) {
      this.markAsExpired()
    }
  }

  isExpired() {
    return this.state.status === CampaignStatus.EXPIRED || this.state.endDate < new Date()
  }

  markAsActive() {
    if (this.isExpired()) {
      throw new ConflictException('Cannot activate an expired campaign.')
    }

    this.state.status = CampaignStatus.ACTIVE
  }

  markAsClosed() {
    if (this.isExpired()) {
      throw new ConflictException('Cannot close an expired campaign.')
    }

    this.state.status = CampaignStatus.CLOSED
  }

  markAsExpired() {
    this.state.status = CampaignStatus.EXPIRED
  }

  toPlain() {
    return this.state
  }
}

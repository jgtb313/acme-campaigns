import { ConflictException } from '@nestjs/common'

import { CampaignDomain } from '@/core/campaign/campaign.domain'
import { Campaign, CampaignStatus } from '@/core/campaign/campaign.schema'
import { makeMockCampaign } from '@/core/campaign/campaign.mock'

const now = new Date()

describe('CampaignDomain', () => {
  it('should create a campaign with default values', () => {
    const campaign = new CampaignDomain(makeMockCampaign())
    const plain = campaign.toPlain()

    expect(plain.campaignId).toBeDefined()
    expect(plain.name).toBe('Test Campaign')
    expect(plain.status).toBe(CampaignStatus.ACTIVE)
    expect(plain.deletedAt).toBeNull()
  })

  it('should update campaign with new values', () => {
    const campaign = new CampaignDomain(makeMockCampaign())
    const updatedCampaign = { name: 'Updated Campaign' }

    campaign.update(updatedCampaign)
    const plain = campaign.toPlain()

    expect(plain.name).toBe(updatedCampaign.name)
    expect(plain.updatedAt).toBeDefined()
  })

  it('should mark campaign as expired after update if new data is expired', () => {
    const campaign = new CampaignDomain(makeMockCampaign())
    const updatedCampaign = { startDate: new Date('2024-06-01'), endDate: new Date('2024-06-10') }

    campaign.update(updatedCampaign)

    expect(campaign.isExpired).toBeTruthy()
  })

  it('should return true if campaign is expired', () => {
    const expiredCampaign = new CampaignDomain(
      makeMockCampaign({
        endDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        status: CampaignStatus.ACTIVE,
      }),
    )

    expect(expiredCampaign.isExpired()).toBe(true)
  })

  it('should throw ConflictException when trying to activate an expired campaign', () => {
    const expiredCampaign = new CampaignDomain(
      makeMockCampaign({
        endDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        status: CampaignStatus.EXPIRED,
      }),
    )

    expect(() => expiredCampaign.markAsActive()).toThrowError(new ConflictException('Cannot activate an expired campaign.'))
  })

  it('should mark campaign as active', () => {
    const campaign = new CampaignDomain(makeMockCampaign())

    campaign.markAsActive()
    const plain = campaign.toPlain()

    expect(plain.status).toBe(CampaignStatus.ACTIVE)
  })

  it('should throw ConflictException when trying to close an expired campaign', () => {
    const expiredCampaign = new CampaignDomain(
      makeMockCampaign({
        endDate: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        status: CampaignStatus.EXPIRED,
      }),
    )

    expect(() => expiredCampaign.markAsClosed()).toThrowError(new ConflictException('Cannot close an expired campaign.'))
  })

  it('should mark campaign as closed', () => {
    const campaign = new CampaignDomain(makeMockCampaign())

    campaign.markAsClosed()
    const plain = campaign.toPlain()

    expect(plain.status).toBe(CampaignStatus.CLOSED)
  })

  it('should mark campaign as expired', () => {
    const campaign = new CampaignDomain(makeMockCampaign())

    campaign.markAsExpired()
    const plain = campaign.toPlain()

    expect(plain.status).toBe(CampaignStatus.EXPIRED)
  })

  it('should throw error if invalid data is passed during initialization', () => {
    const invalidCampaignData = {
      name: '',
      startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    } as Campaign

    expect(() => new CampaignDomain(invalidCampaignData)).toThrowError()
  })
})

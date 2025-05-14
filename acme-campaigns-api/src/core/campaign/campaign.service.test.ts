import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'

import { ICampaignRepository } from '@/ports/database'
import { CampaignInMemoryRepository } from '@/adapters/in-memory'
import { CampaignService } from '@/core/campaign/campaign.service'
import { CampaignCategory, CampaignStatus } from '@/core/campaign/campaign.schema'
import { campaignMocks, makeMockCampaign } from '@/core/campaign/campaign.mock'

describe('CampaignService', () => {
  let service: CampaignService
  let campaignRepository: ICampaignRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: 'CAMPAIGN_REPOSITORY',
          useClass: CampaignInMemoryRepository,
        },
      ],
    }).compile()

    service = module.get<CampaignService>(CampaignService)
    campaignRepository = module.get<ICampaignRepository>('CAMPAIGN_REPOSITORY')

    for (const campaign of campaignMocks) {
      campaignRepository.create(campaign)
    }

    jest.clearAllMocks()
  })

  describe('listCampaignsPaginated', () => {
    it.each([
      { query: { offset: 0, limit: 5 }, expected: 5 },
      { query: { offset: 0, limit: 10, name: 'Active' }, expected: 2 },
      { query: { offset: 0, limit: 10, status: CampaignStatus.ACTIVE }, expected: 2 },
    ])('should return paginated list of campaigns', async (input) => {
      const result = await service.listCampaignsPaginated(input.query)

      expect(result.values).toHaveLength(input.expected)
    })
  })

  describe('getCampaign', () => {
    it('should return a single campaign by id', async () => {
      const campaignId = campaignMocks[0].campaignId
      const result = await service.getCampaign(campaignId)

      expect(result.campaignId).toBe(campaignId)
      expect(result.name).toBe('Active Campaign (current)')
    })

    it('should throw NotFoundException if campaign does not exist', async () => {
      await expect(() => service.getCampaign('non-existent-id')).rejects.toThrow(new NotFoundException(`Campaign non-existent-id not found`))
    })

    it('should throw NotFoundException if campaign has been deleted', async () => {
      const newCampaignData = makeMockCampaign({
        name: 'New Campaign',
        category: CampaignCategory.AWARENESS,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        status: CampaignStatus.ACTIVE,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await service.createCampaign(newCampaignData)
      await service.deleteCampaign(result.campaignId)

      await expect(() => service.getCampaign(result.campaignId)).rejects.toThrow(new NotFoundException(`Campaign ${result.campaignId} not found`))
    })
  })

  describe('createCampaign', () => {
    it('should create a new campaign', async () => {
      const newCampaignData = makeMockCampaign({
        name: 'New Campaign',
        category: CampaignCategory.AWARENESS,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        status: CampaignStatus.ACTIVE,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await service.createCampaign(newCampaignData)

      expect(result.name).toBe('New Campaign')
      expect(result.status).toBe('ACTIVE')
    })
  })

  describe('updateCampaign', () => {
    it('should update an existing campaign', async () => {
      const campaignId = campaignMocks[0].campaignId
      const updateData = { name: 'Updated Campaign Name' }

      const result = await service.updateCampaign(campaignId, updateData)

      expect(result.name).toBe('Updated Campaign Name')
    })

    it('should throw NotFoundException if campaign does not exist', async () => {
      await expect(() => service.updateCampaign('non-existent-id', { name: 'New Name' })).rejects.toThrow(
        new NotFoundException(`Campaign non-existent-id not found`),
      )
    })
  })

  describe('activeCampaign', () => {
    it('should activate a campaign', async () => {
      const campaignId = campaignMocks[0].campaignId
      const result = await service.activeCampaign(campaignId)

      expect(result.status).toBe('ACTIVE')
    })

    it('should throw NotFoundException if campaign does not exist', async () => {
      await expect(() => service.activeCampaign('non-existent-id')).rejects.toThrow(new NotFoundException(`Campaign non-existent-id not found`))
    })
  })

  describe('closeCampaign', () => {
    it('should close a campaign', async () => {
      const campaignId = campaignMocks[0].campaignId
      const result = await service.closeCampaign(campaignId)

      expect(result.status).toBe('CLOSED')
    })

    it('should throw NotFoundException if campaign does not exist', async () => {
      await expect(() => service.closeCampaign('non-existent-id')).rejects.toThrow(new NotFoundException(`Campaign non-existent-id not found`))
    })
  })

  describe('deleteCampaign', () => {
    it('should delete a campaign', async () => {
      const campaignId = campaignMocks[0].campaignId

      await expect(() => service.deleteCampaign(campaignId)).not.toThrow()
    })

    it('should throw NotFoundException if campaign does not exist', async () => {
      await expect(() => service.deleteCampaign('non-existent-id')).rejects.toThrow(new NotFoundException(`Campaign non-existent-id not found`))
    })
  })
})

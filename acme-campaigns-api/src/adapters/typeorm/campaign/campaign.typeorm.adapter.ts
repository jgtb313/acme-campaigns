import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, FindOptionsWhere } from 'typeorm'

import { ICampaignRepository } from '@/ports/database'
import { CampaignTypeormEntity } from '@/adapters/typeorm/campaign/campaign.typeorm.entity'
import { CampaignDomain } from '@/core/campaign/campaign.domain'

@Injectable()
export class CampaignTypeormAdapter implements ICampaignRepository {
  constructor(
    @InjectRepository(CampaignTypeormEntity)
    private readonly repository: Repository<CampaignTypeormEntity>,
  ) {}

  findAllPaginated: ICampaignRepository['findAllPaginated'] = async ({ offset, limit, ...input }) => {
    const { name, status } = input

    const where: FindOptionsWhere<CampaignTypeormEntity> = {}

    if (name) {
      where.name = ILike(`%${name}%`)
    }

    if (status) {
      where.status = status
    }

    const skip = offset ?? 0
    const take = limit ?? 10

    const [values, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
      order: {
        createdAt: 'ASC',
      },
    })

    return {
      values: values.map(this.toCampaignDomain),
      meta: {
        totalItems: total,
        totalPages: Math.ceil(total / take),
      },
    }
  }

  findById: ICampaignRepository['findById'] = async (campaignId) => {
    const campaign = await this.repository.findOne({ where: { campaignId } })

    if (!campaign) {
      throw new NotFoundException(`Campaign ${campaignId} not found`)
    }

    return this.toCampaignDomain(campaign)
  }

  create: ICampaignRepository['create'] = async (input) => {
    const data = this.repository.create(input)

    const campaign = await this.repository.save(data)

    return this.toCampaignDomain(campaign)
  }

  updateById: ICampaignRepository['updateById'] = async (campaignId, input) => {
    const campaign = await this.findById(campaignId)

    await this.repository.update(campaign.state.campaignId, input)

    return this.findById(campaign.state.campaignId)
  }

  deleteById: ICampaignRepository['deleteById'] = async (campaignId) => {
    const campaign = await this.repository.findOne({ where: { campaignId } })

    if (!campaign) {
      return
    }

    await this.repository.softDelete(campaignId)

    return
  }

  private toCampaignDomain(model: CampaignTypeormEntity) {
    return new CampaignDomain(model)
  }
}

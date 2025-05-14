import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CampaignTypeormAdapter } from '@/adapters/typeorm/campaign/campaign.typeorm.adapter'
import { CampaignTypeormEntity } from '@/adapters/typeorm/campaign/campaign.typeorm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CampaignTypeormEntity])],
  providers: [
    {
      provide: 'CAMPAIGN_REPOSITORY',
      useClass: CampaignTypeormAdapter,
    },
  ],
  exports: ['CAMPAIGN_REPOSITORY'],
})
export class CampaignRepositoryModule {}

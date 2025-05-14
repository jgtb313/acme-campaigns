import { Module } from '@nestjs/common'

import { CampaignRepositoryModule } from '@/adapters/typeorm'
import { CampaignService } from '@/core/campaign/campaign.service'

@Module({
  imports: [CampaignRepositoryModule],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignServiceModule {}

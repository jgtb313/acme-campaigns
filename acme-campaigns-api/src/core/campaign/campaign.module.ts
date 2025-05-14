import { Module } from '@nestjs/common'

import { CampaignController } from '@/core/campaign/campaign.controller'
import { CampaignServiceModule } from '@/core/campaign/campaign.service.module'

@Module({
  imports: [CampaignServiceModule],
  controllers: [CampaignController],
})
export class CampaignModule {}

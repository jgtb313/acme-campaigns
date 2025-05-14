import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CampaignModule } from '@/core/campaign/campaign.module'
import { TypeormModule } from '@/adapters/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeormModule.register(),

    CampaignModule,
  ],
  controllers: [],
})
export class AppModule {}

import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CampaignTypeormEntity } from '@/adapters/typeorm/campaign/campaign.typeorm.entity'

@Module({})
export class TypeormModule {
  static register(): DynamicModule {
    return {
      module: TypeormModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: 'postgres',
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
              entities: [CampaignTypeormEntity],
              migrations: [],
              migrationsTableName: 'migrations',
              migrationsRun: false,
              synchronize: process.env.STAGE == 'local',
            }
          },
        }),
      ],
    }
  }
}

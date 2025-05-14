import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Campaign, CampaignCategory, CampaignStatus } from '@/core/campaign/campaign.schema'

@Entity('campaigns')
export class CampaignTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  campaignId: Campaign['campaignId']

  @Column({
    type: 'varchar',
  })
  name: Campaign['name']

  @Column({ type: 'enum', enum: CampaignCategory })
  category: Campaign['category']

  @Column({
    type: 'timestamp',
  })
  startDate: Campaign['startDate']

  @Column({
    type: 'timestamp',
  })
  endDate: Campaign['endDate']

  @Column({ type: 'enum', enum: CampaignStatus, default: CampaignStatus.ACTIVE })
  status: Campaign['status']

  @DeleteDateColumn({})
  deletedAt: Campaign['deletedAt']

  @CreateDateColumn({})
  createdAt: Campaign['createdAt']

  @UpdateDateColumn({})
  updatedAt: Campaign['updatedAt']
}

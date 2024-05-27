import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';
import { VendorModule } from '../vendor/vendor.module';
import { CampaignModule } from '../campaign/campaign.module';

@Module({
  imports: [PrismaModule, SettingsModule, BeneficiaryModule, VendorModule,CampaignModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

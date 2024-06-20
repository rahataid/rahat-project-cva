import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  imports: [PrismaModule, SettingsModule, BeneficiaryModule, VendorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '@rumsan/prisma';
import { ProjectContants } from '@rahataid/sdk';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ProjectContants.ELClient,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
      },
    ]),
  ],
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService, PrismaService],
})
export class BeneficiaryModule {}

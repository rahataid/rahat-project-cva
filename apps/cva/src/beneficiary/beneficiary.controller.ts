import { Controller } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CONTROLLERS, JOBS } from '@rahataid/cva-extensions';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
  VerifyWalletDto,
} from '@rahataid/cva-extensions';

@Controller()
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @MessagePattern({ cmd: JOBS.BENEFICIARY.LIST, uuid: process.env.PROJECT_ID })
  findAll() {
    return this.beneficiaryService.findAll();
  }

  @MessagePattern({
    cmd: JOBS.BENEFICIARY.LIST_PROJECT_PII,
    uuid: process.env.PROJECT_ID,
  })
  findAllPii(data) {
    return this.beneficiaryService.findAllBeneficaryPii(data);
  }

  @MessagePattern({
    cmd: JOBS.BENEFICIARY.ADD_TO_PROJECT,
    uuid: process.env.PROJECT_ID,
  })
  create(data: CreateBeneficiaryDto) {
    return this.beneficiaryService.create(data);
  }

  @MessagePattern({
    cmd: JOBS.BENEFICIARY.BULK_ASSIGN_TO_PROJECT,
    uuid: process.env.PROJECT_ID,
  })
  createMany(data) {
    return this.beneficiaryService.createMany(data);
  }

  @MessagePattern({ cmd: JOBS.BENEFICIARY.GET, uuid: process.env.PROJECT_ID })
  findOne(payload) {
    return this.beneficiaryService.findOne(payload);
  }

  @MessagePattern({ cmd: CONTROLLERS.BENEFICIARY.UPDATE })
  update(@Payload() updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return this.beneficiaryService.update(
      updateBeneficiaryDto.id,
      updateBeneficiaryDto
    );
  }

  @MessagePattern({
    cmd: JOBS.BENEFICIARY.VERIFY_SIGNATURE,
    uuid: process.env.PROJECT_ID,
  })
  verifyWallet(verifyWalletDto: VerifyWalletDto) {
    return this.beneficiaryService.verfiyWallet(verifyWalletDto);
  }
}

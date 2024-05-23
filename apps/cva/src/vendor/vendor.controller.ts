import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlockchainVendorDto } from './dto/blockchain-vendor.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { VendorService } from './vendor.service';
import { CONTROLLERS, JOBS } from '@rahataid/cva-extensions';

@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @MessagePattern({ cmd: JOBS.VENDOR.CREATE, uuid: process.env.PROJECT_ID })
  create(@Payload() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @MessagePattern({ cmd: JOBS.VENDOR.LIST, uuid: process.env.PROJECT_ID })
  findAll(data) {
    return this.vendorService.findAll(data);
  }

  @MessagePattern({ cmd: CONTROLLERS.VENDOR.LISTONE })
  findOne(@Payload() id: number) {
    return this.vendorService.findOne(id);
  }

  @MessagePattern({ cmd: CONTROLLERS.VENDOR.UPDATE })
  update(@Payload() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(updateVendorDto.id, updateVendorDto);
  }

  @MessagePattern({ cmd: CONTROLLERS.VENDOR.BLOCKCHAIN })
  blockchainCall(@Payload() blockchaindto: BlockchainVendorDto) {
    return this.vendorService.blockchainCall(blockchaindto);
  }
}

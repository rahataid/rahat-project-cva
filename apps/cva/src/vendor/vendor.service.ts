import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';
import { createContractInstanceSign, getContractByName } from '../utils/web3';
import { BlockchainVendorDto } from './dto/blockchain-vendor.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

type IParams = string[];
@Injectable()
export class VendorService {
  private rsprisma;
  constructor(private readonly prisma: PrismaService) {
    this.rsprisma = prisma.rsclient;
  }

  async create(createVendorDto: CreateVendorDto) {
    return await this.rsprisma.vendor.create({ data: { ...createVendorDto } });
  }

  async findAll(data) {
    const uuids = data.map((dat) => dat.vendorId);

    const vendata = await this.rsprisma.vendor.findMany({
      where: {
        uuid: {
          in: uuids,
        },
      },
    });


    const result = data.map((dat) => {
      const vendorData = vendata.find((ven) => ven.uuid === dat.vendorId);
      console.log({ vendorData });

      return {
        ...dat,
      };
    });
    console.log({ result });
    return result;
  }

  async findOne(id: number) {
    return await this.rsprisma.vendor.findUnique({ where: { id: id } });
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    return await this.rsprisma.vendor.update({
      where: { id: id },
      data: { ...updateVendorDto },
    });
  }

  async executeMetaTxRequest(params: any) {
    const [metaTxRequest] = params;
    const address = await getContractByName(
      'ERC2771Forwarder',
      this.rsprisma.setting
    );
    const forwarderContract = await createContractInstanceSign(
      address,
      this.rsprisma.setting
    );
    metaTxRequest.gas = BigInt(metaTxRequest.gas);
    metaTxRequest.nonce = BigInt(metaTxRequest.nonce);
    metaTxRequest.value = BigInt(metaTxRequest.value);

    const tx = await forwarderContract.execute(metaTxRequest);
    const result = await tx.wait();
    return result;
  }

  async getBeneficiaryTokens(params: IParams) {
    // const [beneficiaryAddress] = params;
    // const elContract = await createContractInstance(
    //   await getContractByName('EL', this.rsprisma.setting),
    //   this.rsprisma.setting
    // );

    return {};
  }

  async blockchainCall(blockchaindto: BlockchainVendorDto) {
    const { method, params } = blockchaindto;
    switch (method) {
      case 'executeMetaTxRequest':
        return await this.executeMetaTxRequest(params);
      // case 'getVoucherStatics':
      //   return await this.getVoucherDetails(params);
      case 'getBeneficiaryTokens':
        return await this.getBeneficiaryTokens(params);
      default:
        throw new Error('Method not found');
    }
  }
}

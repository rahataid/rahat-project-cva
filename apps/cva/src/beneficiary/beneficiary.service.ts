import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { UUID } from 'crypto';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
  VerifyWalletDto,
} from '@rahataid/cva-extensions';

@Injectable()
export class BeneficiaryService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy // private eventEmitter: EventEmitter2
  ) {
    this.rsprisma = prisma.rsclient;
  }
  async create(dto: CreateBeneficiaryDto) {
    console.log({ dto });
    return this.rsprisma.beneficiary.create({
      data: dto,
    });
  }

  async createMany(dto) {
    return this.rsprisma.beneficiary.createMany({ data: dto });
  }

  async findAll() {
    const data = await this.rsprisma.beneficiary.findMany();
    // projectData.data = data;
    // console.log('projectData', projectData);
    const projectData = {
      data: data,
    };
    return this.client.send(
      { cmd: 'rahat.jobs.beneficiary.list_by_project' },
      projectData
    );
  }

  async findAllBeneficaryPii(data) {
    const projectdata = await this.rsprisma.beneficiary.findMany({
      where: { type: data?.status },
    });

    const combinedData = data.data
      .filter((item) =>
        projectdata.some((ben) => ben.uuid === item.beneficiaryId)
      )
      .map((item) => {
        const matchedBeneficiary = projectdata.find(
          (ben) => ben.uuid === item.beneficiaryId
        );
        return {
          ...item,
          Beneficiary: {
            ...matchedBeneficiary,
            ...item.Beneficiary,
          },
        };
      });

    return { data: combinedData, meta: data.meta };
  }

  async findByUUID(uuid: UUID) {
    return await this.rsprisma.beneficiary.findUnique({ where: { uuid } });
  }

  async findOne(payload) {
    const { uuid, data } = payload;
    const projectBendata = await this.rsprisma.beneficiary.findUnique({
      where: { uuid },
    });
    if (data) return { ...data, ...projectBendata };
    return projectBendata;
  }

  async update(id: number, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return await this.rsprisma.beneficiary.update({
      where: { id: id },
      data: { ...updateBeneficiaryDto },
    });
  }

  async verfiyWallet(verfiyWalletDto: VerifyWalletDto) {
    const { walletAddress } = verfiyWalletDto;
    return this.rsprisma.beneficiary.update({
      where: { walletAddress },
      data: { isVerified: true },
    });
  }
}

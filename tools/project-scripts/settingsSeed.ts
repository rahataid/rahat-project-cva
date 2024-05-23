import { Prisma, PrismaClient } from '@prisma/client';
import { ContractLib } from './_common';
import { PrismaService } from '@rumsan/prisma';
import { SettingsService } from '@rumsan/extensions/settings';

const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const prisma = new PrismaService();
const settings = new SettingsService(prisma);
const SETTINGS_DB_NAME = 'CVA_DEV';

class SettingsSeed extends ContractLib {
  private projectUUID: string;
  constructor() {
    super();
    this.projectUUID = process.env.PROJECT_UUID as string;
  }

  async getDevSettings() {
    const [devSettings] = await prismaClient.$queryRaw<any[]>(
      Prisma.sql([
        `SELECT *  FROM tbl_settings WHERE name='${SETTINGS_DB_NAME}'`,
      ])
    );
    return devSettings;
  }

  public async addAppSettings() {
    await settings.create({
      name: 'Blockchain',
      value: {
        chainId: process.env.CHAIN_ID,
        rpcUrl: process.env.NETWORK_PROVIDER,
        chainName: process.env.CHAIN_NAME,
        networkId: process.env.NETWORK_ID,
        nativeCurrency: {
          name: process.env.CURRENCY_NAME,
          symbol: process.env.CURRENCY_SYMBOL,
        },
      },
      isPrivate: false,
    });
  }

  public async addAdminAddress(adminAddress: string) {
    await settings.create({
      name: 'Admin',
      value: {
        address: adminAddress,
      },
      isPrivate: false,
    });
  }
}

async function main() {
  const seedProject = new SettingsSeed();
  const devSettings = await seedProject.getDevSettings();
  const adminAccounts = await devSettings.value.adminAccounts;

  await seedProject.addAppSettings();
  await seedProject.addAdminAddress(adminAccounts[0]);

  process.exit(0);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import * as dotenv from 'dotenv';
import { ContractLib } from './_common';
import { uuidV4 } from 'ethers';
import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';

dotenv.config();

const contractName = [
  'RahatDonor',
  'RahatClaim',
  'RahatToken',
  'ERC2771Forwarder',
  'CVAProject',
];

const rahatTokenDetails = {
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 18,
};

const cvaProjectDetails = {
  name: 'CVA Project',
  approveAmount: '1000000',
  beneficiaryClaim1: '1',
  beneficiaryClaim2: '1',
  vendorTransferAmount1: '20',
  vendorTransferAmount2: '20',
};

class SeedProject extends ContractLib {
  projectUUID: string;

  constructor() {
    super();
    this.projectUUID = process.env.PROJECT_ID as string;
  }
  static getUUID() {
    return uuidV4(randomBytes(16));
  }
  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async deployCVAContracts() {
    const deployerAccount = this.getWalletFromPrivateKey(this.deployerAddress);
    const otpAccount = this.getWalletFromPrivateKey(this.otpServerAddress);

    console.log('----------Depolying Rahat Donor-------------------');
    const DonorContract = await this.deployContract('RahatDonor', [
      deployerAccount,
    ]);
    console.log({
      DonorContract: DonorContract.contract.target,
      blockNumber: DonorContract.blockNumber,
    });

    console.log('----------Depolying Rahat Claim-------------------');
    const ClaimContract = await this.deployContract('RahatClaim', []);
    console.log({
      ClaimContract: ClaimContract.contract.target,
      blockNumber: DonorContract.blockNumber,
    });

    console.log('----------Depolying Forwarder Contracts-------------------');
    const ForwarderContract = await this.deployContract('ERC2771Forwarder', [
      'Rumsan Forwarder',
    ]);
    console.log({
      ForwarderContract: ForwarderContract.contract.target,
      blockNumber: DonorContract.blockNumber,
    });

    console.log('----------Deploying Rahat Token-------------------');
    const TokenContract = await this.deployContract('RahatToken', [
      rahatTokenDetails.name,
      rahatTokenDetails.symbol,
      DonorContract.contract.target,
      rahatTokenDetails.decimals,
    ]);
    console.log({
      TokenContract: TokenContract.contract.target,
      blockNumber: TokenContract.blockNumber,
    });

    console.log('----------Deploying CVA Project Contract-------------------');
    const CVAProjectContract = await this.deployContract('CVAProject', [
      cvaProjectDetails.name,
      TokenContract.contract.target,
      ClaimContract.contract.target,
      otpAccount,
      ForwarderContract.contract.target,
    ]);
    console.log({
      CVAProjectContract: CVAProjectContract.contract.target,
      blockNumber: CVAProjectContract.blockNumber,
    });

    console.log('Writing deployed address to file');
    writeFileSync(
      `${__dirname}/${this.projectUUID}.json`,
      JSON.stringify(
        {
          RahatDonor: {
            address: DonorContract.contract.target,
            startBlock: DonorContract.blockNumber,
          },
          RahatClaim: {
            address: ClaimContract.contract.target,
            startBlock: ClaimContract.blockNumber,
          },
          ERC2771Forwarder: {
            address: ForwarderContract.contract.target,
            startBlock: ForwarderContract.blockNumber,
          },
          RahatToken: {
            address: TokenContract.contract.target,
            startBlock: TokenContract.blockNumber,
          },

          CVAProject: {
            address: CVAProjectContract.contract.target,
            startBlock: CVAProjectContract.blockNumber,
          },
        },
        null,
        2
      )
    );
  }
}

async function main() {
  const seedProject = new SeedProject();
  await seedProject.deployCVAContracts();
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});

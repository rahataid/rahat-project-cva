import { Signer, ethers } from 'ethers';
import { ContractLib } from './_common';

const tokenMintAmount = 1000;

class FundManagement extends ContractLib {
  private donorAddress: Signer;
  private projectAdminAddress;
  private projectUUID: string;

  constructor() {
    super();
    this.donorAddress = this.getWalletFromPrivateKey(this.deployerAddress);
    this.projectAdminAddress = this.getWalletFromPrivateKey(this.adminAddress);
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  private async getCVAAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'CVAProject');
  }

  private async getRahatTokenAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'RahatToken');
  }

  private async getRahatDonorAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'RahatDonor');
  }

  public async mintTokenAndApprove(tokenMintAmount: number) {
    console.log('----------Mining Rahat Token -------------------');
    const tokenAmount = ethers.parseEther(tokenMintAmount.toString());
    const mintTx = await this.callContractMethod(
      'RahatDonor',
      'mintTokenAndApprove',
      [
        await this.getRahatTokenAddress(),
        await this.getCVAAddress(),
        tokenAmount,
      ],
      this.projectUUID,
      this.donorAddress
    );

    if (mintTx) {
      console.log('Token minted successfully');
    }
  }
  public async acceptToken() {
    console.log('----------Accepting token from Donor-------------------');
    const allowanceToProject = await this.callContractMethod(
      'RahatToken',
      'allowance',
      [await this.getRahatDonorAddress(), await this.getCVAAddress()],
      this.projectUUID,
      this.donorAddress
    );

    console.log({ allowanceToProject });

    const acceptToken = await this.callContractMethod(
      'CVAProject',
      'acceptToken',
      [this.getRahatDonorAddress(), allowanceToProject],
      this.projectUUID,
      this.projectAdminAddress
    );
    if (acceptToken) {
      console.log(`Token Accepted Successfully`);
    }
  }

  async getProjectBalance() {
    const balance = await this.callContractMethod(
      'RahatToken',
      'balanceOf',
      [await this.getCVAAddress()],
      this.projectUUID,
      this.projectAdminAddress
    );
    console.log(
      `Balance of the CVA Project : ${ethers.formatEther(balance.toString())}`
    );
  }
}

(async () => {
  const fundManagement = new FundManagement();
  await fundManagement.mintTokenAndApprove(tokenMintAmount);
  await fundManagement.acceptToken();
  await fundManagement.getProjectBalance();
})();

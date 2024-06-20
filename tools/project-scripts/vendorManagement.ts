import { Signer } from 'ethers';
import { ContractLib } from './_common';

const vendorAddresses = ['0x6d094D02B93fCd32249277056C81be39B9969a25'];
const beneficiaryAddresses = [
  '0xD6786F3220bE85C69C137e822f30Ac3eA0Ab6014',
  '0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421',
];
const cvaProjectDetails = {
  name: 'CVA Project',
  approveAmount: '1000000',
  beneficiaryClaim1: BigInt(1),
  beneficiaryClaim2: BigInt(1),
  vendorTransferAmount1: '20',
  vendorTransferAmount2: '20',
};

class VendorManagement extends ContractLib {
  private projectAdminAddress: Signer;
  private projectUUID: string;

  constructor() {
    super();
    this.projectAdminAddress = this.getWalletFromPrivateKey(this.adminAddress);
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  private async getForwarderAddress() {
    return this.getContracts(
      'ERC2771Forwarder',
      this.projectUUID,
      'ERC2771Forwarder'
    );
  }

  private async getCVAAddress() {
    return this.getContracts('CVAProject', this.projectUUID, 'CVAProject');
  }

  private async getCVAContractDetails() {
    const contractDetails = await this.getDeployedContractDetails(
      this.projectUUID,
      ['CVAProject']
    );
    return contractDetails['CVAProject'];
  }

  async requestTokenFromBeneficiary(
    projectAdminAddress: Signer,
    beneficiaryAddress: string,
    claims: BigInt
  ) {
    console.log(
      `----------Requesting Token from ${beneficiaryAddress}-------------------`
    );

    const request = await this.getMetaTransactionRequest(
      this.projectAdminAddress,
      await this.getForwarderAddress(),
      await this.getCVAAddress(),
      'requestTokenFromBeneficiary(address,uint256)',
      [beneficiaryAddress, claims]
    );

    console.log({ request });
    const tx = await this.callContractMethod(
      'ERC2771Forwarder',
      'execute',
      [request],
      this.projectUUID,
      this.projectAdminAddress
    );

    console.log(`${tx}`);

    return tx;
  }
}

(async () => {
  const vendorManagement = new VendorManagement();
  const vendorAddress = vendorManagement.getWalletFromPrivateKey(
    vendorManagement.deployerAddress
  );

  for (const beneficiaryAddress of beneficiaryAddresses) {
    await vendorManagement.requestTokenFromBeneficiary(
      vendorAddress,
      beneficiaryAddress,
      cvaProjectDetails.beneficiaryClaim1
    );
  }
})();

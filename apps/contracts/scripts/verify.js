const { ethers, run, upgrades } = require('hardhat');
const { writeFileSync, readFileSync } = require('fs');

const contractAddress = [
  '0xc34Caa6FF4Ea3e974f82964dB7Ab272FAb3CE38e',
  '0x2Bc2e472735862960c63aaFAF246A856ba755feE',
  '0x29ca821A27d73A68DbB228215e5addCE1e654D47',
  '0x79c21499f7cE045e5F82d2374c06441918554e73',
  '0xB74eb793E799aF1145BB880F2fE9636aA6f87ac3',
];

const contractName = [
  'RahatDonor',
  'RahatClaim',
  'ForwarderContract',
  'RahatToken',
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

const communityName = 'Rumsan Community';

const verify = async (contractAddress, args) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
};

(async function () {
  //   await verify(contractAddress[0], [
  //     `0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421`,
  //   ]);

  //   await verify(contractAddress[1], []);

  //   await verify(contractAddress[2], ['Rumsan Forwarder']);

  await verify(contractAddress[3], [
    rahatTokenDetails.name,
    rahatTokenDetails.symbol,
    contractAddress[0],
    rahatTokenDetails.decimals,
  ]);

  //   await verify(contractAddress[4], [
  //     cvaProjectDetails.name,
  //     contractAddress[3],
  //     contractAddress[1],
  //     `0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421`,
  //     contractAddress[2],
  //   ]);
})();

import axios from 'axios';

export async function getVoucherInfo(subgraphUrl: string, type: string, first: number, skip: number) {

    let where = '';

    if (type === 'REFERRED_VOUCHER') {
        where = `where: {ReferredVoucherAddress_not: null}`
    }

    if (type === 'FREE_VOUCHER') {
        where = `where: {FreeVoucherAddress_not: null}`
    }

    const tokenIdQuery = `query
    voucherAssignedToBeneficiaries
    {
        voucherAssignedToBeneficiaries(
            subgraphError:allow
            ${where}
            
        ) {
        FreeVoucherAddress
        FreeVoucherClaimStatus
        ReferredVoucherAddress
        ReferredVoucherClaimStatus
        beneficiaryAddress
        id
        }
    }`;

    const tokenId = await axios.post(subgraphUrl, {
        query: tokenIdQuery
    });
    return tokenId.data;
}





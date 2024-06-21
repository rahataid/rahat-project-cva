import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BeneficiaryAdded,
  BeneficiaryRemoved,
  ClaimAdjusted,
  ClaimAssigned,
  ClaimProcessed,
  OtpServerUpdated,
  TokenBudgetDecrease,
  TokenBudgetIncrease,
  TokenReceived,
  TokenRegistered,
  TokenTransfer
} from "../generated/CVAProject/CVAProject"

export function createBeneficiaryAddedEvent(param0: Address): BeneficiaryAdded {
  let beneficiaryAddedEvent = changetype<BeneficiaryAdded>(newMockEvent())

  beneficiaryAddedEvent.parameters = new Array()

  beneficiaryAddedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return beneficiaryAddedEvent
}

export function createBeneficiaryRemovedEvent(
  param0: Address
): BeneficiaryRemoved {
  let beneficiaryRemovedEvent = changetype<BeneficiaryRemoved>(newMockEvent())

  beneficiaryRemovedEvent.parameters = new Array()

  beneficiaryRemovedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return beneficiaryRemovedEvent
}

export function createClaimAdjustedEvent(
  beneficiary: Address,
  amount: BigInt
): ClaimAdjusted {
  let claimAdjustedEvent = changetype<ClaimAdjusted>(newMockEvent())

  claimAdjustedEvent.parameters = new Array()

  claimAdjustedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimAdjustedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromSignedBigInt(amount))
  )

  return claimAdjustedEvent
}

export function createClaimAssignedEvent(
  beneficiary: Address,
  amount: BigInt
): ClaimAssigned {
  let claimAssignedEvent = changetype<ClaimAssigned>(newMockEvent())

  claimAssignedEvent.parameters = new Array()

  claimAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimAssignedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimAssignedEvent
}

export function createClaimProcessedEvent(
  beneficiary: Address,
  vendor: Address,
  token: Address,
  amount: BigInt
): ClaimProcessed {
  let claimProcessedEvent = changetype<ClaimProcessed>(newMockEvent())

  claimProcessedEvent.parameters = new Array()

  claimProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  claimProcessedEvent.parameters.push(
    new ethereum.EventParam("vendor", ethereum.Value.fromAddress(vendor))
  )
  claimProcessedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  claimProcessedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimProcessedEvent
}

export function createOtpServerUpdatedEvent(param0: Address): OtpServerUpdated {
  let otpServerUpdatedEvent = changetype<OtpServerUpdated>(newMockEvent())

  otpServerUpdatedEvent.parameters = new Array()

  otpServerUpdatedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )

  return otpServerUpdatedEvent
}

export function createTokenBudgetDecreaseEvent(
  tokenAddress: Address,
  amount: BigInt
): TokenBudgetDecrease {
  let tokenBudgetDecreaseEvent = changetype<TokenBudgetDecrease>(newMockEvent())

  tokenBudgetDecreaseEvent.parameters = new Array()

  tokenBudgetDecreaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenBudgetDecreaseEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenBudgetDecreaseEvent
}

export function createTokenBudgetIncreaseEvent(
  tokenAddress: Address,
  amount: BigInt
): TokenBudgetIncrease {
  let tokenBudgetIncreaseEvent = changetype<TokenBudgetIncrease>(newMockEvent())

  tokenBudgetIncreaseEvent.parameters = new Array()

  tokenBudgetIncreaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenBudgetIncreaseEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenBudgetIncreaseEvent
}

export function createTokenReceivedEvent(
  token: Address,
  from: Address,
  amount: BigInt
): TokenReceived {
  let tokenReceivedEvent = changetype<TokenReceived>(newMockEvent())

  tokenReceivedEvent.parameters = new Array()

  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tokenReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenReceivedEvent
}

export function createTokenRegisteredEvent(
  tokenAddress: Address
): TokenRegistered {
  let tokenRegisteredEvent = changetype<TokenRegistered>(newMockEvent())

  tokenRegisteredEvent.parameters = new Array()

  tokenRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return tokenRegisteredEvent
}

export function createTokenTransferEvent(
  token: Address,
  to: Address,
  amount: BigInt
): TokenTransfer {
  let tokenTransferEvent = changetype<TokenTransfer>(newMockEvent())

  tokenTransferEvent.parameters = new Array()

  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  tokenTransferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenTransferEvent
}

import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ClaimCreated,
  ClaimProcessed,
  OtpAddedToClaim
} from "../generated/RahatClaim/RahatClaim"

export function createClaimCreatedEvent(
  claimId: BigInt,
  claimer: Address,
  claimee: Address,
  token: Address,
  otpServer: Address,
  amount: BigInt
): ClaimCreated {
  let claimCreatedEvent = changetype<ClaimCreated>(newMockEvent())

  claimCreatedEvent.parameters = new Array()

  claimCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "claimId",
      ethereum.Value.fromUnsignedBigInt(claimId)
    )
  )
  claimCreatedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  claimCreatedEvent.parameters.push(
    new ethereum.EventParam("claimee", ethereum.Value.fromAddress(claimee))
  )
  claimCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  claimCreatedEvent.parameters.push(
    new ethereum.EventParam("otpServer", ethereum.Value.fromAddress(otpServer))
  )
  claimCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimCreatedEvent
}

export function createClaimProcessedEvent(claimId: BigInt): ClaimProcessed {
  let claimProcessedEvent = changetype<ClaimProcessed>(newMockEvent())

  claimProcessedEvent.parameters = new Array()

  claimProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "claimId",
      ethereum.Value.fromUnsignedBigInt(claimId)
    )
  )

  return claimProcessedEvent
}

export function createOtpAddedToClaimEvent(claimId: BigInt): OtpAddedToClaim {
  let otpAddedToClaimEvent = changetype<OtpAddedToClaim>(newMockEvent())

  otpAddedToClaimEvent.parameters = new Array()

  otpAddedToClaimEvent.parameters.push(
    new ethereum.EventParam(
      "claimId",
      ethereum.Value.fromUnsignedBigInt(claimId)
    )
  )

  return otpAddedToClaimEvent
}

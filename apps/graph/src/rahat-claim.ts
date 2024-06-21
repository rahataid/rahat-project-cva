import {
  ClaimCreated as ClaimCreatedEvent,
  ClaimProcessed as ClaimProcessedEvent,
  OtpAddedToClaim as OtpAddedToClaimEvent,
} from "../generated/RahatClaim/RahatClaim"
import {
  ClaimCreated,
  ClaimProcessed,
  OtpAddedToClaim,
} from "../generated/schema"

export function handleClaimCreated(event: ClaimCreatedEvent): void {
  let entity = new ClaimCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.claimId = event.params.claimId
  entity.claimer = event.params.claimer
  entity.claimee = event.params.claimee
  entity.token = event.params.token
  entity.otpServer = event.params.otpServer
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimProcessed(event: ClaimProcessedEvent): void {
  let entity = new ClaimProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.claimId = event.params.claimId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOtpAddedToClaim(event: OtpAddedToClaimEvent): void {
  let entity = new OtpAddedToClaim(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.claimId = event.params.claimId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

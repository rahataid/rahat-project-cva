import {
  Approval as ApprovalEvent,
  OwnerAdded as OwnerAddedEvent,
  OwnerRemoved as OwnerRemovedEvent,
  Transfer as TransferEvent,
} from "../generated/RahatToken/RahatToken"
import {
  Approval,
  OwnerAdded,
  OwnerRemoved,
  Transfer,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerAdded(event: OwnerAddedEvent): void {
  let entity = new OwnerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerRemoved(event: OwnerRemovedEvent): void {
  let entity = new OwnerRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

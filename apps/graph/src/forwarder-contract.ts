import {
  EIP712DomainChanged as EIP712DomainChangedEvent,
  ExecutedForwardRequest as ExecutedForwardRequestEvent,
} from "../generated/ForwarderContract/ForwarderContract"
import {
  EIP712DomainChanged,
  ExecutedForwardRequest,
} from "../generated/schema"

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent,
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecutedForwardRequest(
  event: ExecutedForwardRequestEvent,
): void {
  let entity = new ExecutedForwardRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.signer = event.params.signer
  entity.nonce = event.params.nonce
  entity.success = event.params.success

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

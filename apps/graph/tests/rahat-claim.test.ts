import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ClaimCreated } from "../generated/schema"
import { ClaimCreated as ClaimCreatedEvent } from "../generated/RahatClaim/RahatClaim"
import { handleClaimCreated } from "../src/rahat-claim"
import { createClaimCreatedEvent } from "./rahat-claim-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let claimId = BigInt.fromI32(234)
    let claimer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let claimee = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let otpServer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newClaimCreatedEvent = createClaimCreatedEvent(
      claimId,
      claimer,
      claimee,
      token,
      otpServer,
      amount
    )
    handleClaimCreated(newClaimCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClaimCreated created and stored", () => {
    assert.entityCount("ClaimCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimId",
      "234"
    )
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "claimee",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "otpServer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

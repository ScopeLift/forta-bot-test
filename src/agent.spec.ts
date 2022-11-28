import { 
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  createTransactionEvent
} from "forta-agent"
import agent from "./agent"

describe("target address agent", () => {
  let handleTransaction: HandleTransaction;

  const createTxEventWithAddresses = (addresses: {[addr: string]: boolean}) => createTransactionEvent({
    transaction: {} as any,
    logs: [],
    contractAddress: null,
    block: {} as any,
    addresses,
  })

  beforeAll(() => {
    handleTransaction = agent.handleTransaction
  })

  describe("handleTransaction", () => {
    it("returns empty findings if no blacklisted address is involved", async () => {
      const txEvent = createTxEventWithAddresses({})

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it("returns a finding if a blacklisted address is involved", async () => {
      const address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase();
      const txEvent = createTxEventWithAddresses({ [address]: true })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Target contract address",
          description: `Transaction involving a target address: ${address}`,
          alertId: "FORTA-3",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            address
          }
        })
      ])
    })
  })
})
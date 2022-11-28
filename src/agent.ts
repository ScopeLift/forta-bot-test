import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType, 
  ethers
} from 'forta-agent'

const { getAddress } = ethers.utils;

export const sameAddress = (addr1: string, addr2: string): boolean => {
  return getAddress(addr1) === getAddress(addr2);
};

const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase();
const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7".toLowerCase();
const uniswap = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45".toLowerCase();

const targetList = [usdc, usdt, uniswap];

// report finding if any addresses involved in transaction are blacklisted
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = []

  const x = Object.keys(txEvent.addresses).forEach((value: string, index: number) => {
    if (targetList.includes(value)) {
      findings.push(
        Finding.fromObject({
          name: "Target contract address",
          description: `Transaction involving a target address: ${value}`,
          alertId: "FORTA-3",
          type: FindingType.Info,
          severity: FindingSeverity.Info,
          metadata: {
            address: value
          }
        }
      ))
    }
  });
  
  return findings
}

export default {
  handleTransaction
}
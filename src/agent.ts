import { 
  Finding, 
  HandleTransaction, 
  HandleBlock,
  TransactionEvent, 
  ethers,
  BlockEvent
} from 'forta-agent'

const { keccak256, toUtf8Bytes } = ethers.utils;

const usdc = "0x000000000000000000000000A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48".toLowerCase();
const usdt = "0x000000000000000000000000dAC17F958D2ee523a2206206994597C13D831ec7".toLowerCase();
const uniswap = "0x00000000000000000000000068b3465833fb72A70ecDF485E0e4C7bD8665Fc45".toLowerCase();
const someAddress = "0x000000000000000000000000C2F51C9DF556AF3742888aEd683981510aD57D5e".toLowerCase();
const someOtherAddress = "0x000000000000000000000000CD531Ae9EFCCE479654c4926dec5F6209531Ca7b".toLowerCase();

const transferSig = keccak256(toUtf8Bytes("Transfer(address,address,uint256)"));

let targetList = [usdc, usdt, uniswap, someAddress, someOtherAddress];

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  let findings: Finding[] = [];
  console.log(`\n\nNew block ${blockEvent.blockNumber}.`);
  return findings;
}

// report finding if any addresses involved in transaction are in the target list including ERC20 transfers from the logs
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  console.log(`Transaction ${txEvent.transaction.hash} has ${Object.keys(txEvent.addresses).length} addresses`);
  console.log(`Transaction has ${txEvent.logs.length} logs`);
  txEvent.logs.forEach(log => {
    const topics = log.topics;
    if ( (topics.length == 3) && (topics[0] == transferSig) ) {
      console.log(`We have an ERC20 transfer function`);
      console.log(`from address is: ${topics[1]}`);
      console.log(`dest address is: ${topics[2]}`);
      if (targetList.includes(topics[1])) {
        console.log(`Found an ERC20 transfer from a member of the target list: ${topics[1]} in topic 1 `)
      }
      if (targetList.includes(topics[2])) {
        console.log(`Found an ERC20 transfer to   a member of the target list: ${topics[2]} in topic 2 `)
      }
    }
  });
  return findings
}

export default {
  handleTransaction, handleBlock
}

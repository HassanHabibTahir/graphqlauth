const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  `https://data-seed-prebsc-1-s1.binance.org:8545/773844dceb1f4e9b9c2c0ef913956874`
);
const CONNECT_WITH_BLOCKCHAIN_AND_GET_BALANCE = async () => {
  const balance = await provider.getBalance(
    `0xf239DEd579e4359a1186F2c204Af505F1F06539d`
  );
  console.log(ethers.utils.formatEther(balance));
};
// CONNECT_WITH_BLOCKCHAIN_AND_GET_BALANCE();

// Smart Contracts
const ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint8", name: "decimals", type: "uint8" },
      { internalType: "uint256", name: "supply", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "feeWallet", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const TethterUSD_Contract = `0xdAC17F958D2ee523a2206206994597C13D831ec7`;

const contract = new ethers.Contract(TethterUSD_Contract, ABI, provider);
const CONNECT_SMART_CONTRACT = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balanceOf = await contract.balanceOf(
    `0xf239DEd579e4359a1186F2c204Af505F1F06539d`
  );
  console.log(
    name,
    symbol,
    ethers.utils.formatEther(totalSupply),
    ethers.utils.formatEther(balanceOf)
  );
};
// CONNECT_SMART_CONTRACT();

const Account1 = `0xf239DEd579e4359a1186F2c204Af505F1F06539d`;
const Account2 = `0x7a709c469ac9Bdf9C64d93504635fcdb781c7bA8`;
const privateKey = `b2ac85a1e937e7a1edb86cb92ba00137796fda600ec96116267cf08328d0f793`;
const wallet = new ethers.Wallet(privateKey, provider);

const SendTransaction = async () => {
  const tx = await wallet.sendTransaction({
    to: Account2,
    value: 1 * 10 ** 18,
  });
  await tx.wait();
  console.log(tx, "hhhhh");
};

// SendTransaction();

const BUSD = `0x1933CAFbc5a1840355DBd9967a3e97FF36f14370`;
const contract1 = new ethers.Contract(BUSD, ABI, wallet);

const writeContract = async () => {
  const balance = await contract1.balanceOf(Account1);
  console.log(ethers.utils.formatEther(balance));
  // const block = await provider.getBlockNumber();
  // const transferEvents = await contract1.queryFilter(
  //   "Transfer",
  //   block - 10,
  //   block
  // );
  // console.log(transferEvents);
  const tx = await contract1.transfer(
    Account2,
    ethers.utils.parseUnits("0.00011", 18)
  );
  // await tx.wait().then((reciept) => console.log(reciept));
  console.log(tx);
};
writeContract();

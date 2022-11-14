import { ethers } from "ethers";
import { Button, Input, Container } from "@mui/material";

import React, { useState } from "react";

const Ethers = () => {
  // function buyToken(uint256 amount, bool eth) public payable {
  //     require(
  //         block.timestamp >= preSaleStartTime &&
  //             block.timestamp < preSaleEndTime,
  //         "PRESALE: PreSale time not met"
  //     );
  //     uint256 numberOfTokens;
  //     if (eth) {
  //         require(
  //             bnbBalance[msg.sender] + (msg.value) <= maxAmountbnb,
  //             "PRESALE: Amount exceeds max limit"
  //         );
  //         require(
  //             msg.value >= minAmountbnb && msg.value <= maxAmountbnb,
  //             "PRESALE: Amount not correct"
  //         );

  //         numberOfTokens = bnbToToken(msg.value);
  //         token.transferFrom(owner, msg.sender, numberOfTokens);
  //         soldToken = soldToken + (numberOfTokens);
  //         amountRaisedbnb = amountRaisedbnb + (msg.value);
  //         bnbBalance[msg.sender] = bnbBalance[msg.sender] + (msg.value);
  //     } else {
  //         require(
  //             busdBalance[msg.sender] + (amount) <= maxAmountBUSD,
  //             "PRESALE: Amount exceeds max limit"
  //         );
  //         require(
  //             amount >= minAmountBUSD && amount <= maxAmountBUSD,
  //             "PRESALE: Amount not correct"
  //         );
  //         BUSD.transferFrom(msg.sender, address(this), amount);
  //         numberOfTokens = busdtoToken(amount);
  //         token.transferFrom(owner, msg.sender, numberOfTokens);
  //         soldToken = soldToken + (numberOfTokens);
  //         amountRaisedBUSD = amountRaisedBUSD + (amount);
  //         busdBalance[msg.sender] = busdBalance[msg.sender] + (amount);
  //     }

  //     emit BuyToken(msg.sender, numberOfTokens);
  // }

  const { ethereum } = window;
  const [address, setAddress] = useState();
  const [owner, setOwner] = useState();
  const [tokenValue, setTokenValue] = useState();
  const [tokenValue1, setTokenValue1] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const connect = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);
    console.log(accounts[0]);
  };
  const contractAddress = "0x685240f5f7135D67a1F79afFf62983A06e4b5CA1";
  const contractABI = [
    {
      inputs: [{ internalType: "address", name: "owner1", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "BuyToken",
      type: "event",
    },
    {
      inputs: [],
      name: "BUSD",
      outputs: [{ internalType: "contract IToken", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "amountRaisedBUSD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "amountRaisedbnb",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "bnbBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "bnbToToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "busdBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "busdtoToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "eth", type: "bool" },
      ],
      name: "buyToken",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_BUSD", type: "address" }],
      name: "changeBUSD",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address payable", name: "_newOwner", type: "address" },
      ],
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
      name: "changePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_token", type: "address" }],
      name: "changeToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "contractBalanceBUSD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "contractBalancebnb",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getContractTokenApproval",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCurrentTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLatestPricebnb",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getProgress",
      outputs: [{ internalType: "uint256", name: "_percent", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxAmountBUSD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxAmountbnb",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minAmountBUSD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minAmountbnb",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "preSaleEndTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "preSaleStartTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "priceFeedbnb",
      outputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_startTime", type: "uint256" },
        { internalType: "uint256", name: "_endTime", type: "uint256" },
      ],
      name: "setPreSaleTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_minAmountbnb", type: "uint256" },
        { internalType: "uint256", name: "_maxAmountbnb", type: "uint256" },
        { internalType: "uint256", name: "_minAmountBUSD", type: "uint256" },
        { internalType: "uint256", name: "_maxAmountBUSD", type: "uint256" },
        { internalType: "uint256", name: "_totalSupply", type: "uint256" },
      ],
      name: "setPreSaletLimits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "soldToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [{ internalType: "contract IToken", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenPerUsd",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "transferFundsBNB",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "transferFundsBUSD",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "transferTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log(contract);
  const preSaleStartTime = async () => {
    const presaleStartTime = await contract.preSaleStartTime();
    setStartTime(presaleStartTime);
  };
  const allowance = async () => {
    const allowance = await contract.allowance();
    console.log(allowance);
  };
  const preSaleEndTime = async () => {
    const presaleStartTime = await contract.preSaleEndTime();
    setEndTime(presaleStartTime);
  };
  const getContract = async () => {
    const owner = await contract.owner();
    setOwner(owner);
  };
  const bnbToToken = async (e) => {
    const value = await contract.bnbToToken(
      ethers.utils.parseUnits(e.target.value, "ether")
    );
    setTokenValue(ethers.utils.formatEther(value));
  };
  const busdToToken = async (e) => {
    const value = await contract.busdtoToken(
      ethers.utils.parseUnits(e.target.value, "ether")
    );
    setTokenValue1(ethers.utils.formatEther(value));
  };

  return (
    <div>
      <Container>
        <Button onClick={connect}>Connect</Button>
        <p>{address}</p>
        <Button onClick={getContract}>get Contract</Button>
        <p>Owner :{owner}</p>
        <Button onClick={preSaleStartTime}>
          start :{startTime && ethers?.utils?.formatEther(startTime)}
        </Button>
        <Button onClick={preSaleEndTime}>
          end :{endTime && ethers?.utils?.formatEther(endTime)}
        </Button>
        <Button onClick={allowance}>Allowance</Button>
        <br />
        <Input onChange={bnbToToken} placeholder="Enter Bnb" /> <br />
        <Input value={tokenValue} placeholder="Token Here" /> <br /> <br />
        <Input onChange={busdToToken} placeholder="Enter BUSD" /> <br />
        <Input value={tokenValue1} placeholder="Token Here" />
      </Container>
    </div>
  );
};

export default Ethers;

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
  contractABI,
  contractAddress,
  contractOwner,
} from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const creatEtheremContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenSupply: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) alert("please install metamask");

      const acccounts = await ethereum.request({ method: "eth_accounts" });
      if (acccounts.length) {
        setCurrentAccount(acccounts[0]);
      } else {
        console.log("No accounts founded");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const genrateTokens = async () => {
    const { tokenName, tokenSymbol, tokenSupply } = formData;
    const transactionContract = creatEtheremContract();
    const transactionHash = await transactionContract.genrateTokens(
      tokenName,
      tokenSymbol,
      tokenSupply
    );
    setIsLoading(true);
    const transactionReceipt = await transactionHash.wait();
    setIsLoading(false);
    console.log(transactionReceipt);
    setContractAddress(transactionReceipt.logs[0].address);
    console.log(transactionReceipt.logs[0].address);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        genrateTokens,
        connectWallet,
        handleChange,
        isLoading,
        currentAccount,
        contractAddress,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

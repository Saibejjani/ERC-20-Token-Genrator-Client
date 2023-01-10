import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export default function Transactions() {
  const {
    genrateTokens,
    connectWallet,
    handleChange,
    isLoading,
    currentAccount,
    contractAddress,
    formData,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { tokenName, tokenSymbol, tokenSupply } = formData;

    e.preventDefault();

    if (!tokenName || !tokenSymbol || !tokenSupply) return;

    genrateTokens();
  };
  const { tokenName, tokenSymbol, tokenSupply } = formData;
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className=" blue-glassmorphism p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold ">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5  white-glassmorphism shadow-md shadow-transperant">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
                  <p className="text-white font-semibold text-lg mt-1 flex">
                    {tokenSupply ? tokenSupply : 0}
                    {tokenSymbol ? ` ${tokenSymbol}` : " ETH"}
                  </p>
                </div>
                <div>
                  <p className="text-white font-light text-sm ">
                    {`${currentAccount.slice(0, 5)}...${currentAccount.slice(
                      currentAccount.length - 4
                    )}`}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1 flex">
                    {tokenName ? tokenName : "Ethereum"}
                  </p>
                  <p className=" text-white font-semibold text-lg mt-1 text-right"></p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input
                placeholder="Token Name - Token"
                name="tokenName"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="Token Symbol - TKN"
                name="tokenSymbol"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="Total Supply -  35000000000000"
                name="tokenSupply"
                type="number"
                handleChange={handleChange}
              />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Create Token Now
                </button>
              )}
            </div>
            <p className=" text-white font-semibold text-lg mt-1 text-right">
              {contractAddress
                ? `copy and paste it in your metamask import token option ${contractAddress}`
                : ""}
            </p>

            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-10 px-5 ">
              Create Cryto <br /> With few Clicks
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ContractJson from "../utils/Canary.json";

const CanaryDetails = {
  CONTRACT_ADDRESS: "0xF6c4BE6aEeE3a161a5aFB456EF2bf642C9764CF6",
  // If you have changed the contract code, you will need to update the ABI file
  CONTRACT_ABI: ContractJson.abi,
};

export function useContract(ethereum, isValidChain) {
  const [contract, setContract] = useState(null);
  useEffect(() => {
    if (!ethereum || !isValidChain || contract) {
      return;
    }
    // We initialize the contract with the provider and the ABI only once
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const newContract = new ethers.Contract(
      CanaryDetails.CONTRACT_ADDRESS,
      CanaryDetails.CONTRACT_ABI,
      signer
    );
    setContract(newContract);
  }, [ethereum, contract, isValidChain]);
  return contract;
}

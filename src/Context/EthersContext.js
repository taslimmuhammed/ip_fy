import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { useNavigate } from "react-router-dom";
import { BigNoToInt, stringToBigInt } from "../Utils/convertions";

export const EthersContext = createContext(null);
const { ethereum } = window;
if (!ethereum) alert("Please install metamask to use the application");

export default function Ethers({ children }) {
  const contractAddress = "0x319301D85A72F0FfFA5AD51219FbBb8F60d23D9A";
  const [currentAccount, setCurrentAccount] = useState(null);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const [Contract, setContract] = useState(
    new ethers.Contract(contractAddress, abi, signer)
  );

  const navigate = useNavigate();

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        alert("No accounts found");
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };


  const createIP = async (uri) => {
    try {
      const contract = getContract();
      let res = await contract.createIP(uri);
      let r2 = await res.wait();
      console.log({res, r2})
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  
  const putforSell = async (id, price) => {
    const contract = getContract();
    let res = await contract.putforSell(stringToBigInt(id), stringToBigInt(price));
    await res.wait();
  };
  const putforLend = async (id, price) => {
    const contract = getContract();
    let res = await contract.putforLend(stringToBigInt(id), stringToBigInt(price));
    await res.wait();
  };
  const changeBuyingPrice = async (id, price) => {
    const contract = getContract();
    let res = await contract.changeBuyingPrice(stringToBigInt(id), stringToBigInt(price));
    await res.wait();
  };
  const changeLendingPrice = async (id, price) => {
    const contract = getContract();
    let res = await contract.changeLendingPrice(stringToBigInt(id), stringToBigInt(price));
    await res.wait();
  };

  const checkCurrentLendingStatus = async (id) => {
    try {
      const contract = getContract();
      let res = await contract.checkCurrentLendingStatus(stringToBigInt(id));
      console.log("onlend", res);
      return res
    } catch (e) {
      return false
    }
  };
  const buy = async (id, price) => {
    const contract = getContract();
    const value = parseInt(price)
    let res = await contract.buy(stringToBigInt(id), { value }); //convert
    await res.wait();
  };
  const lend = async (id, months, price) => {
    const contract = getContract();
    const value = parseInt(price) * parseInt(months);
    console.log(stringToBigInt(id), stringToBigInt(months))
    let res = await contract.lend(stringToBigInt(id), stringToBigInt(months), { value }); //convert
    await res.wait();
  };
  const transferOwnerShip = async (id, wallet) => {
    try {
      const contract = getContract();
      let res = await contract.transferOwnerShip(id, wallet); //convert
      await res.wait();
      alert(`Transaction Succeful`);
    } catch (e) {
      console.log(e);
    }
  };
  const withdrawLend = async (id) => {
    const contract = getContract();
    let res = await contract.withdrawLend(id);
    await res.wait();
  };
  const withdrawSell = async (id) => {
    const contract = getContract();
    let res = await contract.withdrawSell(id);
    await res.wait();
  };

  //Reading Functions------------------------------------------------------------------------------------
  const checkLendablity = async (id) => {
    try {
      const contract = getContract();
      let res = await contract.checkLendablity(id);
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const checkBuyablity = async (id) => {
    try {
      const contract = getContract();
      let res = await contract.checkBuyablity(id);
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const checkIPOwner = async (id) => {
    try {
      const account = await getWallet();
      const contract = getContract();
      let res = await contract.checkIPOwner(id, account);
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const getBuyingMarket = async (index) => {
    try {
      const contract = getContract();
      let res = await contract.getBuyingMarket('0x0', '0xfff')
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const getLendingMarket = async (index) => {
    try {
      const contract = getContract();
      let res = await contract.getLendingMarket('0x0', '0xfff'); //convert
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const getUserIPs = async () => {
    try {
      const contract = getContract();
      const account = await getWallet();
      let res = await contract.getUserIPs(account); //convert
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const getIPDetails = async (_id) => {
    try {
      const contract = getContract();
      const id = stringToBigInt(_id)
      const res = await contract.getIPDetails(id);
      const uri = await contract.URI(id);
      return { ...res, uri };
    } catch (e) {
      console.log(e);
    }
  };
  const getUserLendings = async () => {
    try {
      const contract = getContract();
      const account = await getWallet();
      let res = await contract.getUserLendings(account);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  const getIPCounter = async () => {
    try {
      const contract = getContract();
      let res = await contract.IPCounter();
      return BigNoToInt(res);
    } catch (e) {
      console.log(e);
    }
  }
  const getWallet = async () => {
    try {
      if (currentAccount == null) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        return account;
      } else return currentAccount;
    } catch (e) {
      alert(e);
    }
  };

  const getContract = () => {
    try {
      if (Contract == null) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setContract(contract);
        return contract;
      } else return Contract;
    } catch (e) {
      alert(e);
      return null;
    }
  };

  // const getN = async () => {
  //   const chainId = 137 // Polygon Mainnet

  //   if (window.ethereum.networkVersion !== chainId) {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: "0x89" }]
  //       });
  //     } catch (err) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       if (err.code === 4902) {
  //         await window.ethereum.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [
  //             {
  //               chainName: 'Polygon Mainnet',
  //               chainId: "0x89",
  //               nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
  //               rpcUrls: ['https://polygon-rpc.com/']
  //             }
  //           ]
  //         });
  //       }
  //     }
  //   }

  // }

  useEffect(() => {
    checkIfWalletIsConnect();

    //  getN();
  }, []);

  return (
    <EthersContext.Provider
      value={{
        connectWallet,
        currentAccount,
        checkIfWalletIsConnect,
        createIP,
        putforSell,
        putforLend,
        changeBuyingPrice,
        changeLendingPrice,
        buy,
        lend,
        transferOwnerShip,
        withdrawLend,
        withdrawSell,
        checkLendablity,
        checkBuyablity,
        checkIPOwner,
        getBuyingMarket,
        getLendingMarket,
        getUserIPs,
        getWallet,
        getIPDetails,
        getUserLendings,
        checkCurrentLendingStatus,
        getIPCounter
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}
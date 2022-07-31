import React, { useEffect, useState } from 'react';
import trading from './build/contracts/Trading.json';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [nftUrl, setNftUrl] = useState("");
  const [contract, setContract] = useState(null);

  let networkData;
  let networkId;
  let abi;

  useEffect(() => {
    init();
  }, [])

  const handleChange = (e) => {
    // console.log(e.target.value);
    setNftUrl(e.target.value);
  };

  const mintNft = async () => {
    if (nftUrl != "") {
      // const name = await contract.methods.name().call();
      // const cost = await Web3.utils.toWei('0.01', 'ether');
      await contract.methods.safeMint(account ,nftUrl).send({from: account});
      alert("Minting Successful");

    }
    else {
      alert("URL is empty");
    }
  }

  async function init() {
    const provider = await detectEthereumProvider();
    setProvider(provider);
    if (provider) {
      let web3 = new Web3(provider);
      let acc = await web3.eth.getAccounts();
      // console.log(acc);
      // console.log(acc[0]);
      setAccount(acc[0]);
      networkId = await web3.eth.net.getId();
      networkData = await trading.networks[networkId];
      abi = trading.abi;

      if (networkData) {
        const address = await networkData.address;
        const cont = await new web3.eth.Contract(abi, address);
        setContract(cont);
        // const name = await contract.methods.name().call();
        // console.log(name);

      } else {
        alert("Wallet account not found");
      }


    } else {
      alert('Wallet not connected');
    }


  }

  return (
    <>
      <section className="text-center">
        <p className="lead text-center">Minting to {account}</p>
        <input type="text" value={nftUrl} onChange={(e) => handleChange(e)} required/><br />
        <button onClick={() => mintNft()} className="mt-2">Mint Nft</button>
      </section>
    </>
  );
}

export default App;
const Web3 = require('web3');
const abi = require('./abi');

//LHKD is on Ethereum Testnet Rinkeby network
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));

//for mainnet
// const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));

const contractAddr = "0x777a2EAe2DbAbF08D50E822631c54e4304414b45";
const LHKD = new web3.eth.Contract(abi.fiatTokenImplementation, contractAddr);

async function calculateWalletBalance(walletAddress) {

    //check if ethereum address is valid
    if (!web3.utils.isAddress(walletAddress)){
        console.log('Invalid Ethereum address');
        return;
    }

    // gives the answer in wei unit. 1 wei = 10^-18 Ether
    let balance = await LHKD.methods.balanceOf(walletAddress).call();
    
    // convert this to Ether
    let finalBalance = web3.utils.fromWei(balance.toString(), 'ether')
    
    console.log(`Balance of wallet ${walletAddress} is --> ${finalBalance} LHKD`);
} 

calculateWalletBalance('0x9a60372c628b9856e43307bca6c39001c4ae18e7');
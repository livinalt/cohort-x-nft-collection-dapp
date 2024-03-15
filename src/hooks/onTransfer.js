import {ethers} from 'ethers'
import ABI from '../constants/erc721.json'

// listening to erc721 nft transfer function
async function getTransfer(){
    const contract_address = import.meta.env.VITE_contract_address; /// nft contract address
    const provider = new ethers.providers.WebSocketProvider(import.meta.env.VITE_wss_rpc_url);

    const contract = new ethers.Contract(contract_address, ABI, provider);

    contract.on("Transfer", (from, to, value, event)=>{

        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }

        console.log(JSON.stringify(transferEvent, null, 4))

    })
}
getTransfer()
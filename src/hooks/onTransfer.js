import {ethers} from 'ethers'
import {ABI} from '../constants/erc721.json'

// listening to erc721 nft transfer function
async function getTransfer(){
    const contract_address = "0x4E479E19b061e60F2817f6c205E3Ca09D3982676"; /// nft contract address
    const provider = new ethers.providers.WebSocketProvider(import.meta.env.VITE_rpc_url);

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
getTransfer();
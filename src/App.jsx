import { Box, Button, Container, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import {useState} from 'react';
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";

configureWeb3Modal();

const contract_address = import.meta.env.VITE_contract_address;

function App() {
    const tokensData = useCollections();
    const myTokenIds = useMyNfts();
    const [receiverAddress, setReceiverAddress] = useState("0x")
    const [tokenID, setTokenID] = useState("")
    

    const myTokensData = tokensData.filter((x, index) =>
        myTokenIds.includes(index)
    );
    return (
        <Container>
            <Header />
            <main className="mt-6">
                <AppTabs
                    MyNfts={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {myTokensData.length === 0 ? (
                                <Text>No NFT owned yet</Text>
                            ) : (
                                myTokensData.map((x) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        <a href={`https://testnets.opensea.io/assets/${contract_address}`} 
                                        target="_blank" rel="noopener noreferrer" 
                                        className="px-8 py-2 text-xl mt-2 text-blue-700">
                                            View on OpenSea
                                        </a>
                                       
                                     <div>
                                        <Dialog.Root>
                                                <Dialog.Trigger>
                                                    <Button className= 'px-8 py-2 text-xl mt-2 bg-blue-700'>Transfer NFT</Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content style={{ maxWidth: 450 }}>
                                                    <Dialog.Title>Transfer NFT </Dialog.Title>
                                                    <Dialog.Description size="2" mb="4">
                                                    Transfer this NFT to address you specify
                                                    </Dialog.Description>

                                                    <Flex direction="column" gap="3">
                                                    <label>
                                                        <Text as="div" size="2" mb="1" weight="bold">
                                                        Address
                                                        </Text>
                                                        <TextField.Input
                                                        defaultValue={receiverAddress}
                                                        placeholder="Enter address"
                                                        onChange = {(e => setReceiverAddress(e.target.value))}
                                                        />
                                                    </label>
                                                    
                                                    <label>
                                                        <Text as="div" size="2" mb="1" weight="bold">
                                                        Token ID
                                                        </Text>
                                                        <TextField.Input
                                                        defaultValue={tokenID}
                                                        placeholder="Enter token ID"
                                                        onChange = {(e => setTokenID(e.target.value))}
                                                        />
                                                    </label>
                                                    
                                                    </Flex>

                                                    <Flex gap="3" mt="4" justify="end">
                                                    <Dialog.Close>
                                                        <Button variant="soft" color="gray" className= 'px-8 py-2 text-xl mt-2 text-blue600'>
                                                        Cancel
                                                        </Button>
                                                    </Dialog.Close>
                                                    <Dialog.Close>
                                                        <Button 
                                                        className= 'bg-blue-600 px-8 py-2 text-xl mt-2 text-white'>
                                                        Transfer</Button>
                                                    </Dialog.Close>
                                                    </Flex>
                                                </Dialog.Content>
                                                </Dialog.Root>
                                        </div>
                                       
                                    </Box>
                                ))
                            )}

                                    
                        </Flex>
                    }
                    AllCollections={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {tokensData.length === 0 ? (
                                <Text>Loading...</Text>
                            ) : (
                                tokensData.map((x) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>

                                                                                 
                                                <Button
                                                    className="px-8 py-2 text-xl mt-2"
                                                >
                                                    View on OpenSea
                                                </Button>
                                       
                                            <Button                                                
                                                className="px-8 py-2 text-xl mt-2"
                                            >
                                                Mint NFT
                                            </Button>
                                       
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                />
            </main>
        </Container>
    );
}

export default App;

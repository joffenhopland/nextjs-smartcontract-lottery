import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { BiBell } from "react-icons"
import EthIcon from "/public/Ethereum-ETH-icon.png"
import Image from "next/image"

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    // console.log(`chainId: ${chainId}`)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // console.log(`rafflAddress: ${raffleAddress}`)

    const dispatch = useNotification()

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const {
        runContractFunction: enterRaffle,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee())?.toString() || ""
        const numPlayersFromCall = (await getNumberOfPlayers())?.toString() || ""
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: BiBell,
        })
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        updateUI()
        handleNewNotification(tx)
    }

    return (
        <div className="bg-neutral-50 rounded-2xl min-w-96 p-2 grid place-items-center shadow-lg">
            {/* Hi from Lottery Entrance{" "} */}
            {raffleAddress ? (
                <div className="p-5 grid place-items-center">
                    <div className="py-2 px-4 font-normal text-xl">
                        Entrance fee:
                        <span className="font-semibold ml-2">
                            {" "}
                            <Image src={EthIcon} alt="ETH Icon" width={21} height={21} />
                            <span> </span>
                            {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                        </span>
                    </div>

                    <div className="py-6">
                        <button
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded ml-auto shadow-md"
                            onClick={async function () {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                <div>Enter Lottery</div>
                            )}
                        </button>
                    </div>
                    <div className="pt-2 px-4 text-md">
                        Current number of players: <span className="font-bold">{numPlayers}</span>
                    </div>
                    <div className="pt-2 px-4 text-md">The most previous winner was</div>
                    <div className="text-[#2e7daf]">{recentWinner}</div>
                </div>
            ) : (
                <div>
                    <div className="p-6 px-5 grid place-items-center font-semibold">
                        Please connect to a supported chain!
                    </div>
                </div>
            )}
        </div>
    )
}

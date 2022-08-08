import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
import { useMoralis } from "react-moralis"

const supportedChains = ["4", "31337"]

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()

    return (
        <div className={styles.container}>
            <Head>
                <title>Decentralized Lottery</title>
                <meta name="description" content="Smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {isWeb3Enabled ? (
                <div className="grid place-items-center h-4/6">
                    <div>
                        {supportedChains.includes(parseInt(chainId).toString()) ? (
                            <div className="flex flex-row">
                                <LotteryEntrance className="p-8" />
                            </div>
                        ) : (
                            <div className="bg-neutral-50 rounded-2xl min-w-96 p-2 shadow-lg">
                                <div className="pt-6 px-5 grid place-items-center font-semibold">
                                    Please switch to a supported chain Id.
                                </div>
                                <div className="pt-6 pb-2 px-5 grid place-items-center font-normal">
                                    The supported Chain Ids are:
                                </div>
                                <div className="pb-6 px-5 grid place-items-center font-normal">{`${supportedChains[0]} (Rinkeby Test Network), ${supportedChains[1]} (localhost).`}</div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center h-4/6">
                    <div className="bg-neutral-50 rounded-2xl min-w-96 p-2 shadow-lg">
                        <div className="grid place-items-center h-4/6">
                            <div className="p-6 px-5 grid place-items-center font-semibold">
                                Please connect to a Wallet
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// return (
//     <div className={styles.container}>
//         <Head>
//             <title>Smart Contract Lottery</title>
//             <meta name="description" content="Smart contract lottery" />
//             <link rel="icon" href="/favicon.ico" />
//         </Head>
//         {/* <ManualHeader /> */}
//         <Header />
//         {isWeb3Enabled ? (
//             <div className="grid place-items-center h-4/6">
//                 {supportedChains.includes(parseInt(chainId).toString()) ? (
//                     <div>
//                         <LotteryEntrance />
//                     </div>
//                 ) : (
//                     <div className="bg-neutral-50 rounded-2xl min-w-96 p-2 grid place-items-center shadow-lg">
//                         <div className="p-6 px-5 grid place-items-center font-semibold">{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>{" "}
//                     </div>
//                 )}
//             </div>
//         ) : (
//             <div className="grid place-items-center h-4/6">
//                 <div className="bg-neutral-50 rounded-2xl min-w-96 p-2 grid place-items-center shadow-lg">
//                     <div className="p-6 px-5 grid place-items-center font-semibold">
//                         Please connect your wallet!
//                     </div>
//                 </div>
//             </div>
//         )}
//     </div>
// )

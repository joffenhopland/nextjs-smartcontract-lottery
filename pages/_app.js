import "../styles/globals.css"
import { MoralisProvider, moralisProvider } from "react-moralis"
import { NotificationProvider } from "@web3uikit/core"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp

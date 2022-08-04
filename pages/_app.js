import "../styles/globals.css"
import { MoralisProvider, moralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp

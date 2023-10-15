import React from "react"
import { Mainnet, DAppProvider } from "@usedapp/core"
import "../styles/globals.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { TransactionPendingProvider } from "@Components/providers/TransactionPendingProvider"

const config = {
  readOnlyChainId: Mainnet.chainID,
  readOnlyUrls: {
    [Mainnet.chainID]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <TransactionPendingProvider>
        <Component {...pageProps} />
      </TransactionPendingProvider>
    </DAppProvider>
  )
}

export default MyApp

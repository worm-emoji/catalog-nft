import '../styles/globals.css'

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '../eth'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { PriceProvider } from '../components/PriceProvider'
import { OwnershipProvider } from '../components/OwnershipProvider'

function Cat({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider customTheme={{'--ck-font-family': 'Iosevka SS05 Web'}}>
        <PriceProvider>
          <OwnershipProvider>
            <Header />
            <Component {...pageProps} />
          </OwnershipProvider>
        </PriceProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default Cat

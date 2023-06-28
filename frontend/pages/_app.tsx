import '../styles/globals.css'

import { WagmiConfig } from 'wagmi'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { PriceProvider } from '../components/PriceProvider'
import { OwnershipProvider } from '../components/OwnershipProvider'
import { config } from '../eth'
import { ConnectKitProvider } from 'connectkit'

function Cat({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          '--ck-font-family': 'Iosevka SS05 Web',
        }}
      >
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

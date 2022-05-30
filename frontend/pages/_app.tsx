import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge'

import { WagmiConfig } from 'wagmi'
import { lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { chains, wagmiClient } from '../eth'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

const cat = merge(lightTheme(), {
  fonts: {
    body: 'Iosevka SS05 Web',
  },
} as Theme)

function Cat({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={cat}>
        <Header />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Cat

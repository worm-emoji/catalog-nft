import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge'

import { WagmiConfig } from 'wagmi'
import { lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { chains, wagmiClient } from '../eth'
import type { AppContext, AppProps as NextAppProps } from 'next/app'
import Header from '../components/Header'
import { PriceProvider } from '../components/PriceProvider'
import {
  getOwnership,
  OwnershipContextType,
  OwnershipProvider,
} from '../components/OwnershipProvider'
import App from 'next/app'

const cat = merge(lightTheme(), {
  fonts: {
    body: 'Iosevka SS05 Web',
  },
} as Theme)

type CustomAppProps = {
  ownership: OwnershipContextType
}

type AppProps = NextAppProps & CustomAppProps

function Cat({ Component, pageProps, ownership }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={cat}>
        <PriceProvider>
          <OwnershipProvider ownership={ownership}>
            <Header />
            <Component {...pageProps} />
          </OwnershipProvider>
        </PriceProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

Cat.getInitialProps = async (appCtx: AppContext): Promise<CustomAppProps> => {
  const [ownership, props] = await Promise.all([
    getOwnership(),
    App.getInitialProps(appCtx),
  ])

  return { ...props, ownership }
}

export default Cat

import { configureChains, chain, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

export const { chains, provider } = configureChains(
  [chain.mainnet],
  [infuraProvider({ infuraId }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'mint.luke.cat',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export const contractAddress = '0x45e71e4c25ac65c0a553e08c78d1e821103e3efa'

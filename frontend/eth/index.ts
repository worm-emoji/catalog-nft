import { configureChains, chain, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const alchemyId = process.env.ALCHEMY_ID

export const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ alchemyId }), publicProvider()],
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

export const contractAddress = '0x1C0353C63A975CA2d22E188e39aFF28cE5b9634F'

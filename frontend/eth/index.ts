import {getDefaultConfig} from "connectkit";
import {createConfig, mainnet} from 'wagmi'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!walletConnectProjectId) throw new Error('WalletConnect project ID is required')

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'mint.luke.cat',
    autoConnect: true,
    chains: [mainnet],
    infuraId,
    walletConnectProjectId,
  })
)

export const contractAddress = '0x45e71e4c25ac65c0a553e08c78d1e821103e3efa'

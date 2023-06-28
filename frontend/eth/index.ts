import { createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

export const config = createConfig(
  getDefaultConfig({
    appName: 'mint.luke.cat',
    infuraId,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  }),
)

export const contractAddress = '0x45e71e4c25ac65c0a553e08c78d1e821103e3efa'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { contractAddress } from '../eth'

const getOwnership = async (): Promise<OwnershipContextType> => {
  // fetch ownership from the Alchemy API
  const apiToken = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiToken}/getOwnersForCollection?contractAddress=${contractAddress}&withTokenBalances=true`
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    console.error(response)
    throw new Error('Failed to fetch ownership')
  }

  const json = await response.json()

  return json
}

export type OwnershipContextType = {
  ownerAddresses: {
    ownerAddress: string
    tokenBalances: {
      tokenId: string
      balance: number
    }[]
  }[]
}

const OwnershipContext = createContext<OwnershipContextType>(
  {} as OwnershipContextType,
)

export const OwnershipProvider = ({ children }: { children: ReactNode }) => {
  const [ownership, setOwnership] = useState<OwnershipContextType>({
    ownerAddresses: [],
  })

  useEffect(() => {
    getOwnership().then(setOwnership)
  }, [])

  return (
    <OwnershipContext.Provider value={ownership}>
      {children}
    </OwnershipContext.Provider>
  )
}

export const useOwnershipOfToken = (tokenId: string): string | undefined => {
  // token ID is a string of a decimal number
  // i.e. "1234567890"
  // and the API response is a hex string
  // i.e. "0x000000000000000000000000000000000000000000000000000000005d74bb36"

  const value = useContext(OwnershipContext)
  const tokenHex = BigInt(tokenId)

  const owners = value.ownerAddresses.filter((owner) => {
    return owner.tokenBalances.some((balance) => {
      return BigInt(balance.tokenId) === tokenHex
    })
  })

  if (owners.length === 0) {
    return undefined
  }

  return owners[0].ownerAddress
}

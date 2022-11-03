import { createContext, useContext, useMemo } from 'react'
import { useContractRead } from 'wagmi'
import abi from '../eth/abi.json'
import { contractAddress } from '../eth'
import { formatEther } from 'ethers/lib/utils'

type PriceContextValue = {
  price: string
}

const PriceContext = createContext<PriceContextValue>({} as PriceContextValue)

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useContractRead(
    {
      contractInterface: abi,
      addressOrName: contractAddress,
    },
    'mintPrice',
  )

  const contractPrice = useMemo(
    () => (data !== undefined ? formatEther(data) : undefined),
    [data],
  )

  return (
    <PriceContext.Provider value={{ price: contractPrice ?? '0.04' }}>
      {children}
    </PriceContext.Provider>
  )
}

export const usePrice = () => {
  return useContext(PriceContext).price
}

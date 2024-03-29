import { createContext, useContext, useMemo } from 'react'
import { useContractRead } from 'wagmi'
import { abi } from '../eth/abi'
import { contractAddress } from '../eth'
import { formatEther } from 'viem'

type PriceContextValue = {
  price: string
}

const PriceContext = createContext<PriceContextValue>({} as PriceContextValue)

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useContractRead({
    abi,
    address: contractAddress,
    functionName: 'mintPrice',
  })

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

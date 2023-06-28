import { createContext, useContext, useMemo } from 'react'
import { useContractRead } from 'wagmi'
import abi from '../eth/abi'
import { contractAddress } from '../eth'

const defaultPrice = 40000000000000000n

type PriceContextValue = {
  price: bigint
}

const PriceContext = createContext<PriceContextValue>({} as PriceContextValue)

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useContractRead({
    abi,
    address: contractAddress,
    functionName: 'mintPrice'
  })

  const contractPrice = useMemo(
    () => (data !== undefined ? data : undefined),
    [data],
  )

  return (
    <PriceContext.Provider value={{ price: contractPrice ?? defaultPrice }}>
      {children}
    </PriceContext.Provider>
  )
}

export const usePrice = () => {
  return useContext(PriceContext).price
}

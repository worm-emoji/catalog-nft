import Image from 'next/future/image'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import {
  useContractRead,
  useContractWrite,
  useEnsName,
  useAccount,
} from 'wagmi'
import { useInView } from 'react-intersection-observer'

import { contractAddress } from '../eth'
import { Data } from '../data/posts'
import abi from '../eth/abi.json'
import Link from 'next/link'
import { usePrice } from './PriceProvider'
import { useOwnershipOfToken } from './OwnershipProvider'

function substrAddress(address: string) {
  return address.substr(0, 6) + '...' + address.substr(address.length - 4)
}

function OwnedBy({ address }: { address: string }) {
  const { data } = useEnsName({ address })

  return (
    <p className="pt-1 text-white text-center">
      owned by{' '}
      <a
        className="underline underline-offset-3"
        href={`https://context.app/${address}?collection=screenshot-catalog-by-worm_emoji`}
        target="_blank"
        rel="noreferrer"
      >
        {data != null ? data : substrAddress(address)}
      </a>
    </p>
  )
}

function MintButton({ data }: { data: Data }) {
  const { data: connection } = useAccount()
  const [isMinting, setIsMinting] = useState(false)

  const ownerFromContext = useOwnershipOfToken(data.id?.toString() ?? '0')
  const [owner, setOwner] = useState(ownerFromContext)

  const canMint = owner === undefined

  const price = usePrice()

  const { write } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
    },
    'mint',
    {
      args: [data.id, data.signature],
      onSettled: () => {
        setIsMinting(false)
        if (connection?.address !== undefined) {
          setOwner(connection.address)
        }
      },
      overrides: { value: ethers.utils.parseEther(price) },
    },
  )

  const handleMint = useCallback(() => {
    if (!isMinting) {
      setIsMinting(true)
      write()
    }
  }, [isMinting, write])

  return (
    <div className="h-10">
      {canMint ? (
        <>
          {connection && (
            <p
              className="pt-1 text-white text-center cursor-pointer"
              onClick={handleMint}
            >
              {isMinting ? 'minting...' : `mint ${price} ETH`}
            </p>
          )}
          {!connection && (
            <div>
              <p className="pt-1 text-white text-center">
                connect wallet to mint
              </p>
            </div>
          )}
        </>
      ) : (
        <>{owner !== undefined && <OwnedBy address={owner} />}</>
      )}
    </div>
  )
}

export function Screenshot({
  data,
  isIndex,
}: {
  data: Data
  isIndex?: boolean
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 500px 0px',
  })
  const [pageIsLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!data.image || !data.height || !data.width) {
    return <></>
  }

  return (
    <div className="w-full px-2" ref={ref}>
      {isIndex ? (
        <Image
          alt={data.name}
          src={data.image}
          width={data.width}
          height={data.height}
        />
      ) : (
        <Link href={`/s/${data.id}`}>
          <a>
            <Image
              alt={data.name}
              src={data.image}
              width={data.width}
              height={data.height}
            />
          </a>
        </Link>
      )}
      <div className={`${isIndex ? 'mt-5' : ''}`}>
        {pageIsLoaded && inView && <MintButton data={data} />}
      </div>
    </div>
  )
}

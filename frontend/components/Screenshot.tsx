import Image from 'next/image'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
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

const zero = '0x0000000000000000000000000000000000000000'

function substrAddress(address: string) {
  return address.substr(0, 6) + '...' + address.substr(address.length - 4)
}

function OwnedBy({ address }: { address: string }) {
  const { data, isError, isLoading } = useEnsName({ address })
  if (isLoading) {
    return <></>
  }
  if (isError) {
    return <p className="pt-1 text-white text-center">{address}</p>
  }
  return (
    <p className="pt-1 text-white text-center underline">
      <a
        href={`https://context.app/${address}?collection=screenshot-catalog-by-worm_emoji`}
        target="_blank"
        rel="noreferrer"
      >
        owned by {data != null ? data : substrAddress(address)}
      </a>
    </p>
  )
}

function MintButton({ data }: { data: Data }) {
  const { data: connection } = useAccount()
  const [isMinting, setIsMinting] = useState(false)

  const isOwned = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
    },
    'ownerOf',
    {
      args: data.id,
      cacheOnBlock: false,
      suspense: true,
    },
  )

  const canMint = !isOwned.data || isOwned.data.toString() == zero

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
        isOwned.refetch()
      },
      overrides: { value: ethers.utils.parseEther('0.08') },
    },
  )
  return (
    <div className="h-10">
      {canMint ? (
        <>
          {connection && (
            <p
              className="pt-1 text-white text-center cursor-pointer"
              onClick={() => {
                if (!isMinting) {
                  setIsMinting(true)
                  write()
                }
              }}
            >
              {isMinting ? 'minting...' : 'mint 0.08 ETH'}
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
        <>
          {isOwned.isSuccess && isOwned.data && (
            <OwnedBy address={isOwned.data.toString()} />
          )}
        </>
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
          layout="responsive"
        />
      ) : (
        <Link href={`/s/${data.id}`}>
          <a>
            <Image
              alt={data.name}
              src={data.image}
              width={data.width}
              height={data.height}
              layout="responsive"
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

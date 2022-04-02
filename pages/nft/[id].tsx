import React, { useState, useEffect } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import { url } from 'inspector'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import toast, {Toaster} from 'react-hot-toast';

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useNFTDrop(collection.address)
  const [mintAmount, setMintAmount] = useState(0);


  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1)
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return
    setMintAmount(mintAmount + 1)
  }

  const connectWithMetaMask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  useEffect(() => {
    if (!nftDrop) return ;

    const fetchPrice = async() => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }

    fetchPrice();
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }

    fetchNFTDropData()
  }, [nftDrop])
  
  const MintNft = () => {
    if (!nftDrop || !address) return;

    setLoading(true);
    const notification = toast.loading(`Minting ${mintAmount} ${collection.nftCollectionName}...`, {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      }
    })

    nftDrop.claimTo(address, mintAmount).then(async (tx) => {
        const reciept = tx[0].receipt
        const claimedTokenId = tx[0].id
        const claimedNFT = await tx[0].data()


        console.log(reciept)
        console.log(claimedTokenId)
        console.log(claimedNFT)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
      toast.dismiss(notification)
      toast.success('Mint Success')
    })
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster />
      <div className="bg-black lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-purple-400 to-teal-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="p-5 text-center">
            <h1 className="bg-gradient-to-br from-purple-400 to-teal-600 bg-clip-text text-3xl font-bold text-transparent">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-white">{collection.description}</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl sm:w-80">
              THE{' '}
              <span className="bg-gradient-to-br from-purple-400 to-teal-600 bg-clip-text font-extrabold font-bold text-transparent underline decoration-pink-600/50">
                APEX
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() => {
              address ? disconnect() : connectWithMetaMask()
            }}
            className="hover:-translate-y-1px-4 rounded-full bg-gradient-to-br from-purple-400 to-teal-600 py-2 text-xs font-bold text-white transition delay-150 duration-300 ease-in-out hover:scale-110 lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.length - 5}
          </p>
        )}

        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-40 object-contain lg:h-20"
            src={urlFor(collection.mainImage).url()}
          />
          <h1 className="bg-gradient-to-br from-purple-400 to-teal-600 bg-clip-text text-3xl font-bold text-transparent  lg:text-3xl">
            {collection.title}
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500">
              {claimedSupply}/ {totalSupply?.toString()} NFT's Claimed
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500">
              {claimedSupply}/ {totalSupply?.toString()} NFT's Claimed
            </p>
          )}

          {loading && (
            <img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
            />
          )}
        </div>

        <div className="mx-auto flex">
          <button
            className="h-14 w-14 flex-initial rounded-md bg-gradient-to-br from-purple-400 to-teal-600 text-xl font-extrabold text-white"
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            className="h-14 w-14 flex-initial text-2xl text-center font-extrabold"
            type="number"
            value={mintAmount}
          />
          <button
            className="h-14 w-14 flex-initial rounded-md bg-gradient-to-br from-purple-400 to-teal-600 text-xl font-extrabold text-white"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        <button
          onClick={MintNft}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="hover:-translate-y-1px-4 disabled: mt-10 h-16 w-full rounded-full bg-gray-400 bg-gradient-to-br from-purple-400 to-teal-600 font-bold text-white transition delay-150 duration-300 ease-in-out hover:scale-110"
        >
          {loading ? (
            <>Loading...</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>Sold Out</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : (
            <span>Mint For {priceInEth} ETH</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `
        *[_type == "collection" && slug.current == $id][0]{
          _id,
          title,
          address,
          description,
          nftCollectionName,
          mainImage {
              asset
          },
          previewImage {
              asset
          },
          slug {
              current
          },
          creator->{
              _id,
              name,
              address,
              slug {
              current
              },
          }
        }`
  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}

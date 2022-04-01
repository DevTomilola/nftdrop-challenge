import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from "../../typings"
import { url } from 'inspector'
import Link from 'next/link'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection}: Props) {
  const connectWithMetaMask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
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
            className="w-60 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
          />
          <h1 className="bg-gradient-to-br from-purple-400 to-teal-600 bg-clip-text text-3xl font-bold text-transparent  lg:text-3xl">
            {collection.title}
          </h1>
          <p className="pt-2 text-xl text-green-500">13/ 21 NFT's Claimed</p>
        </div>

        <button className="hover:-translate-y-1px-4 mt-10 h-16 w-full rounded-full bg-gradient-to-br from-purple-400 to-teal-600 font-bold text-white transition delay-150 duration-300 ease-in-out hover:scale-110">
          Mint NFT(0.01 ETH)
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
      id: params?.id
    })

    if (!collection) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        collection
      }
    }
}

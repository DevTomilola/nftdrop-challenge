import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

function NFTDropPage() {

  const connectWithMetaMask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <div className="bg-black lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-amber-400 to-zinc-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://nftcalendar.io/storage/uploads/events/2022/3/mCnlco3pC3QGf23elXmd4RzvWkokpQOL08KtTtT9.gif"
              alt=""
            />
          </div>
          <div className="p-5 text-center">
            <h1 className="bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text text-4xl font-bold text-transparent">
              KANGOO PUNCH
            </h1>
            <h2 className="text-xl text-white">
              A collection of Kangaroos ready to DOMINATE the METAVERSE!!
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl sm:w-80">
            THE{' '}
            <span className="bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text font-extrabold font-bold text-transparent underline decoration-pink-600/50">
              KANGOO PUNCH
            </span>{' '}
            NFT Market Place
          </h1>
          <button
            onClick={() => {
              address ? disconnect() : connectWithMetaMask()
            }}
            className="hover:-translate-y-1px-4 rounded-full bg-gradient-to-br from-amber-400 to-zinc-600 py-2 text-xs font-bold text-white transition delay-150 duration-300 ease-in-out hover:scale-110 lg:px-5 lg:py-3 lg:text-base"
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
            className="lg:h-50 w-80 object-cover pb-10"
            src="https://ml.globenewswire.com/Resource/Download/1aa3907a-96b1-49f1-ab47-1686cbe116b0"
          />
          <h1 className="bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text text-transparent text-3xl font-bold  lg:text-5xl lg:font-extrabold">
            THE KANGOO PUNCH
          </h1>
          <p className="pt-2 text-xl text-green-500">13/ 21 NFT's Claimed</p>
        </div>

        <button className="hover:-translate-y-1px-4 mt-10 h-16 w-full rounded-full bg-gradient-to-br from-amber-400 to-zinc-600 font-bold text-white transition delay-150 duration-300 ease-in-out hover:scale-110">
          Mint NFT(0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
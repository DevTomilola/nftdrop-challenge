import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <section className="h-screen w-full">
      <img
        src="https://upcomingnft.net/wp-content/uploads/2022/03/cover-for-websites.jpg"
        className="h-full w-full object-cover"
        alt="Image alt text"
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>
      <div className="absolute top-20 right-0 bottom-0 left-0">
        <div className="lg:h-128 container mx-auto px-6 py-4 lg:flex lg:py-16">
          <div className="flex w-full flex-col items-center lg:w-1/2 lg:flex-row">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block text-white">WELCOME TO THE</span>
                <span className="block bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text text-transparent">
                  KANGOO PUNCH NFT.
                </span>
              </h2>
              <p className="mt-4 font-bold text-white">
                We are cool, we are strong, we are fighters🥊. <br /> we are
                here to DOMINATE the metaverse🌐.
                <br />
                <span className="block bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text text-transparent">
                  THIS IS KANGOO PUNCH NFT.
                </span>
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-block transform rounded-md bg-gradient-to-br from-amber-400 to-zinc-600 px-3 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
                  onClick={() => router.push('/nft/kangoo')}
                >
                  MINT NOW
                </a>
              </div>
            </div>
          </div>
          <div className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-zinc-600 p-2 lg:h-96 lg:w-1/2">
            <img
              className="w-full max-w-2xl rounded-md object-cover lg:h-full"
              src="https://pbs.twimg.com/media/FOEfkjSXsAM7QDw.jpg"
              alt="apple watch photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const router = useRouter()

  return (
    <div className="mx-auto min-h-screen max-w-7xl flex-col bg-gradient-to-br from-purple-400 to-teal-600 py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop Challenge</title>
      </Head>
      <h1 className="mb-10 text-center text-3xl font-bold font-extralight text-white">
        THE{' '}
        <span className="bg-gradient-to-br from-amber-400 to-zinc-600 bg-clip-text font-extrabold font-bold text-transparent underline decoration-pink-600/50">
          APEX
        </span>{' '}
        NFT Market Place
      </h1>
      <main className="bg-slate-100 p-10 shadow-lg shadow-indigo-500/40 ">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex cursor-pointer flex-col items-center">
                <img
                  className="w-44 rounded-xl bg-gradient-to-br from-purple-400 to-teal-600 object-cover p-2 transition-all duration-200 hover:scale-105 lg:h-96 lg:w-72"
                  src={urlFor(collection.mainImage).url()}
                />
                <div className="p-5">
                  <h2 className="bg-gradient-to-br from-purple-400 to-teal-600 bg-clip-text text-center text-3xl font-bold text-transparent lg:text-3xl">
                    {collection.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description.substring(0, 38)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
      *[_type == "collection"]{
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
  }
  `
  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}

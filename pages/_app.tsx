import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component
        {...pageProps}
        className="bg-gradient-to-br from-amber-400 to-zinc-600"
      />
    </ThirdwebProvider>
  )
}

export default MyApp


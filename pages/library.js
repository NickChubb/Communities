import Loader from "react-loader-spinner"
import Layout from "@Components/Layout"
import Library from "@Components/library/Library"
import useEth from "@Hooks/useEth"

export default function Home() {
  const { wallet, provider, signer, loading } = useEth()

  return (
    <Layout>
      {loading ? (
        <Loader
          type="BallTriangle"
          // type="Puff"
          color="#00BFFF"
          height={200}
          width={200} //3 secs
        />
      ) : (
        <Library wallet={wallet} provider={provider} signer={signer} />
      )}
    </Layout>
  )
}

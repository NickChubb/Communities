import Layout from '@Components/Layout';
import Library from "@Components/library/Library";
import useEth from '@Hooks/useEth';

export default function Home() {

  const { wallet, setWallet,
          provider, setProvider,
          signer, setSigner,
          loading } = useEth();
  
  return (
    <Layout>

    {
      loading?
        <p>loading...</p>
        :
        <Library wallet={wallet} provider={provider} signer={signer} />
    }
            
    </Layout>
  )
}

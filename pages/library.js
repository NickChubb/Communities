import Loader from "react-loader-spinner";
import Layout from '@Components/Layout';
import Library from "@Components/library/Library";
import useEth from '@Hooks/useEth';
import { useEthers } from "@usedapp/core"; 

export default function Home() {

  const { wallet, setWallet,
          provider, setProvider,
          signer, setSigner,
          loading } = useEth();

  const { account } = useEthers();
  
  return (
    <Layout>

        {
        loading?
            <Loader
                type="BallTriangle"
                // type="Puff"
                color="#00BFFF"
                height={200}
                width={200} //3 secs
            />
            :
            <Library wallet={wallet} provider={provider} signer={signer} />
        }
            
    </Layout>
  )
}

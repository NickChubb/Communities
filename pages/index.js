import Layout from '@Components/Layout';
import styles from '@Styles/Home.module.css'
import { requestAccount } from "@Helpers/eth";
import Library from "@Components/library/Library";
import useEth from '@Hooks/useEth';

export default function Home() {

  const { wallet, setWallet,
          provider, setProvider,
          signer, setSigner,
          handleAccountsChanged } = useEth();

  const handleLogin = async (e) => {
    let account = await requestAccount(handleAccountsChanged);
    if (!account) return false;
    return true;
  }
  
  return (
    <Layout>

        {
          wallet && wallet != 0 && provider ?
            (<Library wallet={wallet} provider={provider} signer={signer} />)
            :
            (
              <div className={styles.library}>
                  <h1 className={styles.library_title}>
                      Log in to access your library
                  </h1>
                  <button onClick={() => handleLogin()}> Log In</button>
              </div>
            )
        }
       
       </Layout>
  )
}

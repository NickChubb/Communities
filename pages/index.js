import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Layout from '@Components/Layout';
import Library from "@Components/library/Library";
import useEth from '@Hooks/useEth';
import { useEthers } from "@usedapp/core";
import { getPosts } from '@Helpers/social';
import PostFeed from "@Components/feed/PostFeed";

export default function Home() {

    const { wallet, loading } = useEth();
    const [ feed, setFeed ] = useState({});
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
      
        const getFeed = async () => {
            getPosts(wallet).then((res) => {
              setFeed(res);
              setLoading(false);
            })
        }

        getFeed();
    }, [isLoading])
  
  return (
    <Layout>

      {
        isLoading && loading?
            <Loader
                type="BallTriangle"
                // type="Puff"
                color="#00BFFF"
                height={200}
                width={200} //3 secs
            />
            :
            <PostFeed feed={feed} />
        }
            
    </Layout>
  )
}

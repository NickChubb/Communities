import React, { useState, useEffect } from 'react'
import { useEthers } from '@usedapp/core';

import Layout from '@Components/Layout'
import CommunityCard from '@Components/explore/CommunityCard'
import styles from '@Styles/Home.module.css'
import useEth from '@Hooks/useEth'
import { getAllCommunities, getAllCommunitiesAddr, getAllCommunityObjects } from '@Helpers/community'
import Loading from '@Components/Loading'

const Explore = () => {

    const { library } = useEthers();
    const [ communities, setCommunities ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect( async () => {

        if (!library) return;
        setCommunities(await getAllCommunityObjects(library));
        setLoading(false);

    }, [library]);

    return (
        <Layout>
            <h1 className={styles.content_title}>
                Explore Communities
            </h1>

            <div className={styles.grid}>

                {
                    communities && communities.length > 0 ?
                        communities.map((community, key) => {
                            return <CommunityCard key={key} community={community} />
                        })
                        :
                        <p>Loading...</p>
                }
            </div>
        </Layout>
    )
}

export default Explore

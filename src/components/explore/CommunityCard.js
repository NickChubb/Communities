import Link from 'next/link';
import Image from 'next/image';
import Loader from 'react-loader-spinner';
import styles from '@Styles/Home.module.css'
import { useState, useEffect } from 'react';

const CommunityCard = ({community, key}) => {

    const [ metadata, setMetadata ] = useState({});
    const [ imageLink, setImageLink ] = useState('');
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const cid = community.metadata.substring(7)
        const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;

        fetch(gatewayUrl).then((data) => {
            data.json().then((json) => {
                setMetadata(json);
                const imageCid = json.image.substring(7);
                setImageLink(`https://ipfs.io/ipfs/${imageCid}`);
                setLoading(false);
            })
        })

    }, [community])

    return (  
        <Link key={key} href={`/c/${community.address}`} >
            <a className={styles.card}>
                <div className={styles.card_image} >
                    {
                        loading?
                            <Loader
                                type="Rings"
                                style={{marginTop: '100px'}}
                                // type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150} //3 secs
                            />
                            :
                            <Image src={`${imageLink}`} alt="Community     Placeholder" width={'300'} height={'150'} layout="intrinsic" objectFit='cover' />
                    }
                </div>
                <div className={styles.card_body} >
                    <h2>{community.name}</h2>
                    <p>{metadata?.description}</p>
                </div>
            </a>
        </Link>  
    )
}

export default CommunityCard;
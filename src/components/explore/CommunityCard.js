import Link from 'next/link';
import Image from 'next/image';
import styles from '@Styles/Home.module.css'

const CommunityCard = ({community}) => {

    return (  
        <Link href={`/c/${community.address}`} >
            <a className={styles.card}>
                <div className={styles.card_image} >
                    <Image src="/placeholder.png" alt="Community     Placeholder" width={'300'} height={'150'}layout="intrinsic" />
                </div>
                <div className={styles.card_body} >
                    <h2>{community.name }</h2>
                    {/* <p>{community.description}</p> */}
                </div>
            </a>
        </Link>  
    )
}

export default CommunityCard;
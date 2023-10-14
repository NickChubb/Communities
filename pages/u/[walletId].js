import Image from 'next/image';
import Layout from '@Components/Layout';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css';

const AccountPage = () => {

    const { wallet } = useEth();

    return (
        <Layout>
            <h1 className={styles.content_title}>
                My Profile
            </h1>

            <div className={styles.profile_grid_container}>

                <div className={styles.profile_image_section}>
                    <Image className={styles.profile_image} src={`/placeholder.png`} alt="Community     Placeholder" width={'225'} height={'225'} layout="intrinsic" objectFit='cover' />
                    {wallet}
                </div>
            </div>
            <div className={styles.profile_info_section}>
            </div>
        </Layout>
    )
}

export default AccountPage;

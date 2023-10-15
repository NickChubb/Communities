import { useRouter } from 'next/router';
import Layout from '@Components/Layout';
import styles from '@Styles/Home.module.css';
import UserIcon from '@Components/shared/UserIcon';

const AccountPage = () => {
    const { query } = useRouter()
    return (
        <Layout>
            <div className={styles.profile_grid_container}>
                <div className={styles.profile_image_section}>
                    {query.walletId && (
                        <div className={styles.profile_image_container}>
                            <UserIcon address={query.walletId} className={styles.profile_image}/>
                        </div>
                    )}
                </div>
                <div className={styles.profile_info_section}>
                    <div className={styles.profile_info_title}>
                        {query.walletId}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AccountPage;

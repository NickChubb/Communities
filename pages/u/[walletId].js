import Layout from '@Components/Layout';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css';

const AccountPage = () => {

    const { wallet } = useEth();

    return (
        <Layout>
            <h1 className={styles.content_title}>
                My Account
            </h1>

            <div className={styles.content}>
                {wallet}
            </div>

        </Layout>
    )
}

export default AccountPage;

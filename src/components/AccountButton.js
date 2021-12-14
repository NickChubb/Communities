import Link from 'next/link';
import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'

const AccountButton = () => {
    
    const { wallet, pending } = useEth();

    return (
        <Link href={`/u/${wallet}`} >
            <a className={styles.account_button}>
                {wallet || "Log in"}
                <br />
                {
                    pending?
                        <p>Pending transaction.</p>
                        :
                        <></>
                }
                
            </a>
        </Link>
    )
}

export default AccountButton;

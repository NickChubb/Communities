import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'

const AccountButton = () => {
    
    const { wallet, pending } = useEth();

    return (
        <a href={`/u/${wallet}`} className={styles.account_button}>
            {wallet || "Log in"}
            <br />
            {
                pending?
                    <p>Pending transaction.</p>
                    :
                    <></>
            }
            
        </a>
    )
}

export default AccountButton;

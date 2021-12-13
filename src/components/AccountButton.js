import useEth from '@Hooks/useEth';
import styles from '@Styles/Home.module.css'

const AccountButton = () => {
    
    const { wallet } = useEth();

    return (
        <a href={`/u/${wallet}`} className={styles.account_button}>
            {wallet || "Log in"}
        </a>
    )
}

export default AccountButton;

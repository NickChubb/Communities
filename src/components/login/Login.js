import React from 'react'

import styles from '@Styles/Home.module.css'

//! NOT YET USED
const Login = () => {

    const handleLogin = async (e) => {
        // e.preventDefault();
        let account = await requestAccount();
        if (!account) return false;
        return true;
      }

    return (
        <div className={styles.library}>
            <h1 className={styles.library_title}>
                Log in to access your library
            </h1>
            <button onClick={() => handleLogin()}> Log In</button>
        </div>
    )
}

export default Login

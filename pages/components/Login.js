import React from 'react'

import styles from '../../styles/Home.module.css'

const Login = () => {

    const handleLogin = (e) => {
        // e.preventDefault();
        let account = requestAccount();
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

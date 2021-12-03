import React from 'react'

import styles from '@Styles/Home.module.css'

const NavBar = () => {
    return (
        <ul className={styles.nav_bar}>
           <li>
               <a href="/" >My Communities</a>
            </li>
           <li>
               <a href="/create">Create</a>
            </li> 
           <li>
                <a href="/explore">Find a Community</a>
            </li>
        </ul>
    )
}
export default NavBar
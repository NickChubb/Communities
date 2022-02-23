import React from 'react';
import Link from 'next/link';
import styles from '@Styles/Home.module.css';

const NavBar = () => {
    return (
        <ul className={styles.nav_bar}>
           <li>
               <Link href="/library">
                    <a>My Communities</a>
               </Link>
            </li>
           <li>
               <Link href="/create">
                    <a>Create</a>
               </Link>
            </li> 
           <li>
               <Link href="/explore">
                    <a>Find a Community</a>
                </Link>
            </li>
        </ul>
    )
}
export default NavBar
import React from 'react'
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';
export default function Navbar() {
    let isAuthenticated=useSelector((state)=>state.user.isAuth);


  return (
    <div>

    <nav className={styles.navbar}>
        
        <NavLink className={` ${styles.logo}`} to='/'>
                CryptoBlogs
            </NavLink>
            <NavLink className={styles.navLinks} to='home' >
                Home
            </NavLink>
            <NavLink className={styles.navLinks } to='Crypto'>
                Crypto Price
            </NavLink>
            <NavLink className={styles.navLinks} to='blog'>
                Blogs
            </NavLink>
            <NavLink className={styles.navLinks} to='CreateBlog'>
                Create a Blog 
            </NavLink>

{isAuthenticated ?
    <button className={styles.SignOut}> SignOut </button>:
  <>
    <NavLink  to='log-in'>
    <button className={styles.loginButton}>
    
    Login
    </button>
    </NavLink>
    <NavLink  to ='sign-up'>
    <button className={styles.signUpButton}>
    Sign in
    
    </button>
    </NavLink>
    </>
}

        

      
    </nav>
    <div className={styles.seperator}></div>

    </div>
)
}

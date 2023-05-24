import React from 'react'
import {GetBlogs} from '../api/external'
import styles from './pagesStyling/Home.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
export default  function Home() {
  const [blogs,setBlogs]=useState([]);

  useEffect( ()=>{
    async function getBlogs (){
      const blogs= await GetBlogs()  
      setBlogs(blogs);
    }
    getBlogs();
   

    setBlogs([]);
    
  },[])
  const titleLength=100;
  // const myblog=[]
  return (
    <>
    <h2 className={styles.articleHeading}>Latest Articles </h2>
    <div className={styles.BlogWrapper}>

        {blogs.map((blog)=>(
          
          
          <div className={styles.blog} key={blog.url}>
                <div className={styles.image}>
                <img src={blog.urlToImage} alt="blogImage"/>
                </div>
                  
                <h3>{blog.title.length<{titleLength}?blog.title:blog.title.slice(0,titleLength)+"..."}</h3>
          </div>
                
                ))
              }

    </div>
              </>

  )
}

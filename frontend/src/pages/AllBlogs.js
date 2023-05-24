import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {GetBlogs} from '../api/internal'
import styles from './pagesStyling/AllBlogs.module.css'
export default function AllBlogs() {
  const [blogs,setBlogs]=useState([]);
  useEffect( ()=>{
    async function getBlogs (){
      const blog= await GetBlogs()
      setBlogs(blog);
    }
    getBlogs();
    setBlogs([]);
  },[])
  // "_id": "6468c602cc187b918ab40159",
  // "author": "646829a36ff8002750f848eb",
  // "title": "welcome blog",
  // "content": "welcome wasay",
  // "photoPath":

  return (
    <div>
      <h1 className={styles.articleHeading}>All Blogs</h1>

      <div className={styles.BlogWrapper}>
        {blogs.map((blog)=>(
          <div className={styles.blog} key={blog._id}>
            <img src={blog.photoPath} alt="No Image" />
            <p>{blog.title}</p>
          </div>
        ))}
            


      </div>

    </div>

  )
}

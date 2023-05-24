import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import TextFields from '../component/textFields/TextFields';
import styles from './pagesStyling/CreateBlog.module.css'
import {useFormik} from 'formik'
import { useSelector } from 'react-redux';
import { SubmitBlog } from '../api/internal';
import { useNavigate } from 'react-router-dom';
// impoer SubmitBlog
// impoer 

export default function CreateBlog() {
    const [blogContent,setBlogContent]=useState("");
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [imagePreview,setImagePreview]=useState("");
    const [authur,setAuthur]=useState(useSelector((state)=>state.user._id))
    // const navigate=navigate();
    const Navigate=useNavigate();
    function handleImageChange(e){
        setImage(e.target.files[0]);
   
    }

    function getImage(e){
        e.preventDefault();
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImage(reader.result);
           
        }
        
    }
    const {values,touched,handleBlur,handleChange,errors}=useFormik({
        initialValues:{
            title:"",
            blogContent:""
        }
    })
    async function SubmitHandler(e){
        e.preventDefault();
        console.log(values)
        

        const data={
            author:authur,
            title:values.title,
            content:values.blogContent,
            photoPath:image

        }

        console.log(data)
        let response =await SubmitBlog(data);
        console.log(response)
        if(response.status===200){
            Navigate('/Home')
        }




    }


  return (
    <div>

        <h1 className={styles.heading}>Create a Blog</h1>

        <div className={styles.blog}>
            <div className={styles.title}>
            <TextFields type="text" placeholder="Enter the Title" name="title" onChange={handleChange} onBlur={handleBlur} values={values.title} /> 

            </div>

            <textarea className={styles.textarea} placeholder='Enter the Content of the blog ' name="blogContent" values={values.blogContent} onChange={handleChange} onBlur={handleBlur} ></textarea>
            {/* upload image  */}
            <div className={styles.imageUpload}>
            <input type="file" name="image" id="image" onChange={getImage} />
            <label htmlFor="image" >Upload Image</label>
            <br/>
            {image !== "" ? <img src={image} width={150} height={150} /> : ""}
            </div>
          

            <button className={styles.submitButton} onClick={SubmitHandler}>Submit</button>

        </div>
        


    </div>
  )
}

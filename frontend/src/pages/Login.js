import React from 'react'
import styles from './pagesStyling/Login.module.css'
import TextFields from '../component/textFields/TextFields'
import {Link} from 'react-router-dom'
import LoginSchema from '../schema/loginSchema'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux'
import {setUserLoginDetails,setSignOutState} from '../store/userSlice'
import {useNavigate} from 'react-router-dom'
import {login} from '../api/internal'
import { useState } from 'react'
export default function Login() {


    const [errorMessage,setErrorMessage]=useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // dispatch(setUserLoginDetails({}));
    // dispatch(setSignOutState());

    const {values,touched,handleBlur,handleChange,errors}=useFormik({
        initialValues:{
            email:"",
            password:""
        }
        ,validationSchema:LoginSchema
    })
   
    async function  handleLogin(){

        const data={
            email:values.email,
            password:values.password
        }
        console.log(data)
        let response;
        try{

            response =await login(data);
        }
        catch(err){
            console.log(err)
        }
        if (response!==undefined &&response.status === 200) {
        
            console.log(response)
            dispatch(setUserLoginDetails(response.data))
            navigate('/Home')
        }
        else{
            console.log(response)
            setErrorMessage(true);
        }
    }

    const errorMessage1="Invalid Credentials"
    // no="no"
  return (
    <div className={styles.LoginWrapper}>
     
        <h1 className={styles.heading}>Log in to your Account</h1>
        <p className={styles.errorMessage}>{!errorMessage?"":errorMessage1} </p>
        <TextFields type="text" placeholder="Enter your email" 
            onChange={handleChange} onBlur={handleBlur} value={values.email} name="email"

            error={errors.email&& touched.email ? 1 :undefined}
            errormessage={errors.email}/>
        <TextFields type="password" placeholder="Enter your Password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" 
         error={errors.password&& touched.password ? 1 :undefined}
         errormessage={errors.password}/>
        
        <button className={styles.loginButton} onClick ={handleLogin}>
            Login
        </button>
        <p className ={styles.signUpmessage}>Don't have an account? <Link  className={styles.link} to="/sign-up">Sign up</Link></p>
        </div>
  )
}

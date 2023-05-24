import React from 'react'
import styles from './pagesStyling/Register.module.css'
import TextFields from '../component/textFields/TextFields'
import {Link} from 'react-router-dom'
import RegisterSchema from '../schema/registerSchema'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux'
import {setUserLoginDetails,setSignOutState} from '../store/userSlice'
import {useNavigate} from 'react-router-dom'
import {register} from '../api/internal'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Register() {


    const [errorMessage,setErrorMessage]=useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let errorMessage2="UserName/Email Already Exists";
    const [errorMessage1,setErrorMessage1]=useState("")
    const {values,touched,handleBlur,handleChange,errors}=useFormik({
        initialValues:{
            name:"",
            userName:"",
            email:"",
            password:"",
            confirmPassword:""
        
        }
        ,validationSchema:RegisterSchema
    })
    useEffect(() => {

    },[errorMessage1,errorMessage])

    // let errorMessage1
    async function  handleRegister(){
        const data={
            name:values.name,
            userName:values.userName,
            email:values.email,
            password:values.password,
            confirmPassword:values.confirmPassword
        }
        console.log(data)
         
        // let response;
        const response =await register(data);
            try {
            if (response && response.status === 200) {
                
                    console.log(response)
                    dispatch(setUserLoginDetails(response.data))
                    navigate('/Home')
                }
                else if (response.code==="ERR_BAD_REQUEST" ){
                    console.log("error is ",response)
                    setErrorMessage(true);
                    setErrorMessage1(response.response.data);

                }
            }
            catch(err){
                console.log("error2 is ",response)
                    setErrorMessage(true);
                    setErrorMessage1("Username/Email already exists");}

    }


    // process.env.REAC
  return (
    <div className={styles.LoginWrapper}>
     
        <h1 className={styles.heading}>Create your Account</h1>
        <p className={styles.errorMessage}> {errorMessage ? errorMessage1 : "Enter Details"} </p>
        <TextFields type="text" placeholder="Enter your Name" 
            onChange={handleChange} onBlur={handleBlur} value={values.name} name="name"

            error={errors.name&& touched.name ? 1 :undefined}
            errormessage={errors.name}/>

        <TextFields type="text" placeholder="Enter your UserName" 
            onChange={handleChange} onBlur={handleBlur} value={values.userName} name="userName"

            error={errors.userName&& touched.userName ? 1 :undefined}
            errormessage={errors.userName}/>
        <TextFields type="text" placeholder="Enter your email" 
            onChange={handleChange} onBlur={handleBlur} value={values.email} name="email"

            error={errors.email&& touched.email ? 1 :undefined}
            errormessage={errors.email}/>
        <TextFields type="password" placeholder="Enter your Password" onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" 
         error={errors.password&& touched.password ? 1 :undefined}
         errormessage={errors.password}/>
        <TextFields type="password" placeholder="Confirm your Password" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} name="confirmPassword" 
         error={errors.confirmPassword&& touched.confirmPassword ? 1 :undefined}
         errormessage={errors.confirmPassword}/>
        
        <button className={styles.loginButton} onClick ={handleRegister}>
            Sign Up
        </button>
        <p className ={styles.signUpmessage}>DAlready have an account? <Link  className={styles.link} to="/log-in">Log in</Link></p>
        </div>
  )
}

import * as yup from 'yup'
const RegisterSchema=yup.object().shape({
    name:yup.string().required("Name is required"),
    userName:yup.string().required("Username is required"),
    email:yup.string().email("Invalid email").required("Email is required"),
    password:yup.string().min(8,"Password must be at least 8 characters").required("Password is required")
    ,
    confirmPassword:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')

})  

export default RegisterSchema


import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        'Content-Type':'application/json'
    }
    ,
    withCredentials:true
})


export const login=async (userData)=>{
    let response;
    try{

      response=await api.post('/login',userData)
    }
  catch(err){
      console.log(err)
  }

  return response;  
}

export const register=async (userData)=>{
    let response;
    try{

      response=await api.post('/register',userData)
    }
  catch(err){
      console.log(err)
  }

  return response;  
}
export const GetBlogs=async ()=>{

    let response;
    try{

      response=await api.get('/blog/all')
    }
  catch(err){
      console.log(err)
  }

  return response.data;  
}
export const SubmitBlog=async (data)=>{

  let response;
  try{

    response=await api.post('/blog',data)
  }
catch(err){
    console.log(err)
}

return response;  
}
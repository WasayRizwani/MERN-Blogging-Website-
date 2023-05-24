import React from 'react';
import  styles from './App.module.css';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import {
  BrowserRouter ,
  Routes,
  Route
} from "react-router-dom";
import Protected from './protected/Protected';
import { useSelector } from 'react-redux';
import Crypto from './pages/Crypto';
import Register from './pages/Register';
import AllBlogs from './pages/AllBlogs';
import CreateBlog from './pages/CreateBlog';
// iimport {<useSelector></useSelector>}

function App() {
  const isAuth=useSelector((state)=>state.user.isAuth);
  return (
    <div className={styles.container}>
       <BrowserRouter>
       <div className={styles.layout}>

        <Navbar/> 
      <Routes>
        <Route path="/" element={<div className={styles.main}><Home /></div>}/>
         
          <Route path="Home" element={<div className={styles.main}><Home /></div>}/>
          <Route path="Crypto" element={<div className={styles.main}><Crypto/></div>}/>
         
          <Route path="blog" element={<Protected isAuth={isAuth}> <div className={styles.main}> <AllBlogs/></div> </Protected>}/>
         
           

          <Route path="CreateBlog" element={
          <Protected isAuth={isAuth}>
            <div className={styles.main}><CreateBlog/></div>
          </Protected>}
          />
       
          <Route path="log-in" element={<div className={styles.main}><Login/></div>}/>
          <Route path="sign-up" element={<div className={styles.main}><Register/></div>}/>


        <Route path="*" element={<h1>Invalid URL </h1>} />
    
      </Routes>
        <Footer/>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

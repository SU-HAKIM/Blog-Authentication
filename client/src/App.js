import React, { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Protected from './pages/Protected';
import Register from './pages/Register';

import axios from "axios";

import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const [registerError, setRegisterError] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setUserRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const loginHandleChange = (e) => {
    setUserLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const register = async (e) => {
    e.preventDefault()
    try {
      let registerUser = await axios.post("/auth/register", userRegister);
      if (registerUser.data.registered) {
        setRegisterError({
          name: '',
          email: '',
          password: ''
        })
        setUserRegister({
          name: '',
          email: '',
          password: ''
        });

        navigate("/login");
      } else {
        let data = registerUser.data;
        setRegisterError(data);
      }
    } catch (error) {

    }
  }
  const login = async (e) => {
    e.preventDefault();
    try {
      let loginUser = await axios.post('/auth/login', userLogin);
      console.log(loginUser.data)
      if (loginUser.data.loggedIn) {
        setLoginError({
          email: '',
          password: ''
        })
        setUserLogin({
          email: '',
          password: ''
        })
      } else {
        setLoginError(loginUser.data)
      }
    } catch (error) {

    }
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Register handleChange={handleChange}
              userRegister={userRegister}
              register={register}
              registerError={registerError}
            />
          }
        />
        <Route path="/login" element=
          {
            <Login
              loginHandleChange={loginHandleChange}
              loginError={loginError}
              userLogin={userLogin}
              login={login}
            />
          }
        />
        <Route path="/protected" element={<Protected />} />
        <Route element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
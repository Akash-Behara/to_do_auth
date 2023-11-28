import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem('access_token_todo')
    if(!token){
      navigate('/login')
    }
  }, [])

  return (
    <div className='min-w-fit min-h-screen bg-gradient-to-t from-[#3c6e7e] from-[-20%]  to-[#111822]'>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

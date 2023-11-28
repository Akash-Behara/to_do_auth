import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if(!userData.email || !userData.name || !userData.password){
      alert('Please fill all the fields')
    } else {
      fetch('http://localhost:4000/api/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })
      .then((res) => res.json())
      .then((data) => { 
        localStorage.setItem('access_token_todo', data.token)
        navigate('/')
      })
    }
  }

  return (
    <div className='min-w-fit h-screen flex justify-center items-center bg-gradient-to-t from-[#3c6e7e] from-[-20%]  to-[#111822]'>
      <div className='p-10 rounded-md shadow-md backdrop-blur-xl backdrop-brightness-125 bg-opacity-60 '>
      <h2 className='text-xl text-white font-bold text-center mb-5'>Register</h2>
        <form className='flex flex-col gap-8'>
         <Input label={'Name'} type={'name'} name='name' onChange={handleInputChange}/>
         <Input label={'Email'} type={'email'} name='email' onChange={handleInputChange}/>
         <Input label={'Password'} type={'password'} name='password' onChange={handleInputChange}/>
         <button onClick={(e) => {handleRegister(e)}} className='p-2 text-white border-2 border-white w-24 rounded-md m-auto hover:border-gray-300 mb-5'>Register</button>
        </form>
        <div className="w-full text-center text-gray-300 text-sm">Already have an account? <Link to="/login" className="underline">Login</Link></div>
      </div>
    </div>
  )
}

export default Register
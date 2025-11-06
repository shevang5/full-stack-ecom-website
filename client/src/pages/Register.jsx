
import { nanoid } from 'nanoid';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../store/action/userActions';
import { useDispatch } from 'react-redux';
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const Navigate = useNavigate()
  const onSubmit = (user) => {
    user.id = nanoid()
    user.isAdmin = false
    console.log(user);
    dispatch(asyncRegisterUser(user))
    Navigate('/login')
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input type="text" id="username" {...register('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" {...register('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
          
        </div>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
   
  )
}

export default Register

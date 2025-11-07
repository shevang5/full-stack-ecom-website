
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Mainroutes from './routes/Mainroutes';
import Navbar from './components/Navbar';
import { asyncCurrentUsers, asyncLogoutUsers } from './store/action/userActions';
import { asyncLoadProducts } from './store/action/productActions';
import { asyncCreateOrder } from './store/action/orderActions';


const App = () => {
  
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.usersReducer)
  const {products} = useSelector((state) => state.productsReducers)
  const {orders} = useSelector((state) => state.orders)

  useEffect(()=>{
    dispatch(asyncLoadProducts())
  },[])

  useEffect(()=>{
    dispatch(asyncCurrentUsers())
  })
  

  return (
    <div>
      <Navbar/>
      <Mainroutes/>
    
    </div>
  )
}

export default App

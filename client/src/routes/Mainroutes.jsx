import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/register'
import ProductDetails from '../pages/users/productDetail'
import CreateProduct from "../pages/admin/CreateProduct"
import OrdersPage from '../pages/OrdersPage'  // ✅ new import

import UpdateProduct from '../pages/admin/updateProduct'  // ✅ renamed
import Cart from '../pages/Cart'
import AdminOrders from '../pages/admin/AdminOrders'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myorders" element={<OrdersPage />} /> {/* ✅ new route */}
      <Route path="/admin/orders" element={<AdminOrders />} />

      <Route path="/admin/create-product" element={<CreateProduct />} />
      <Route path="/admin/update-product/:id" element={<UpdateProduct />} /> {/* ✅ fixed */}
    </Routes>
  )
}

export default Mainroutes


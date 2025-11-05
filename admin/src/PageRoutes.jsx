import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Components/Auth/Login'
import Customers from './Pages/Customers'
import AddCategory from './Pages/Category/AddCategory'
import CategoryList from './Pages/Category/CategoryList'
import EditCategory from './Pages/Category/EditCategory'
import AddProduct from './Pages/Products/AddProduct'
import EditProduct from './Pages/Products/EditProduct'
import ProductList from './Pages/Products/ProductList'
import Createadmin from './Components/Auth/CreateAdmin'
import EditAdmin from './Components/Auth/EditAdmin'
import LoginList from './Components/Auth/LoginList'
import Orders from './Pages/Order/Order'
const PageRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/CustomerList' element={<Customers/>}/>
            <Route path='/AddCategory' element={<AddCategory/>}/>
            <Route path='/CategoryList' element={<CategoryList/>}/>
            <Route path='/EditCategory/:id' element={<EditCategory/>}/>
            <Route path='/AddProducts' element={<AddProduct/>}/>
            <Route path='/EditProduct/:id' element={<EditProduct/>}/>
            <Route path='/ProductList' element={<ProductList/>}/>
            <Route path='/CreateAdmin' element={<Createadmin/>}/>
            <Route path='/EditAdmin/:id' element={<EditAdmin/>}/>
            <Route path='/AdminList' element={<LoginList/>}/>
            <Route path='/Orders' element={<Orders/>}/>
            <Route path="/" element={<Login/>}/>
        </Routes>

    </div>
  )
}

export default PageRoutes

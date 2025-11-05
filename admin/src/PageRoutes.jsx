import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customers'
import AddCategory from './Pages/Category/AddCategory'
import CategoryList from './Pages/Category/CategoryList'
import EditCategory from './Pages/Category/EditCategory'
import AddProduct from './Pages/Products/AddProduct'
const PageRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/CustomerList' element={<Customers/>}/>
            <Route path='/AddCategory' element={<AddCategory/>}/>
            <Route path='/CategoryList' element={<CategoryList/>}/>
            <Route path='/EditCategory/:id' element={<EditCategory/>}/>
            <Route path='/AddProducts' element={<AddProduct/>}/>
        </Routes>

    </div>
  )
}

export default PageRoutes

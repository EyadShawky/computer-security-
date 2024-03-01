import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const LayoutMain = () => {
    return (
        <>  
        <Header />
        <div className='container mt-2'> 
            <Outlet />
        </div>
        </>
    )
}

export default LayoutMain
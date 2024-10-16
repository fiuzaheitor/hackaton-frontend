import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Signup } from '../pages/auth/Signup'
import { Home } from '../pages/dashboard/Home/'


const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Login}/>
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={Signup} />
                <Route path="/home" Component={Home} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
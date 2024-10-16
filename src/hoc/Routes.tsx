import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Sign } from '../pages/auth/Sign'
import { Home } from '../pages/dashboard/Home/'


const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Sign}/>
                <Route path="/login" Component={Sign} />
                <Route path="/home" Component={Home} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
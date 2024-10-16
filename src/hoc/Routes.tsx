import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Signup } from '../pages/auth/Signup'
import { Home } from '../pages/dashboard/Home/'
import { getCookie } from '../utils/cookies'

const routes = [
    {
        "path": "/login",
        "component": Login,
        "protect": false
    },
    {
        "path": "/signup",
        "component": Signup,
        "protect": false
    },
    {
        "path": "/home",
        "component": Home,
        "protect": true
    }
]

function ProtectedRoute() {
    const auth = JSON.parse(getCookie('_bu_l') as string)
    const location = useLocation()
    const navigate = useNavigate()
  
    const [previousPath, setPreviousPath] = useState<string | null>(sessionStorage.getItem('previousPath') || null)

    useEffect(() => {
        const currentPath = location.pathname
        if (previousPath !== currentPath) {
          sessionStorage.setItem('previousPath', currentPath) // Armazena o caminho anterior
          setPreviousPath(currentPath)
        }
      }, [location, previousPath])

    useEffect(() => {
    const isAuthenticated = auth?.ui

    const routeCurrent = routes.find((route: any) => {
        return route.path.split('/')[1] === location.pathname.split('/')[1]
    })

    if (isAuthenticated) {
        if (!routeCurrent?.protect) {
        previousPath ? navigate(previousPath) : navigate('/home')
        }
    } else {
        if (routeCurrent?.protect) {
        navigate('/login')
        }
    }
    }, [auth, location, navigate])

    const isAuthenticated = auth?.ui

    return (
        <Routes>
            {
                isAuthenticated ?
                routes.filter((route: any) => route.protect).map((route: any, index: any) => {
                    return <Route key={index} path={route.path} element={React.createElement(route.component)} />
                })
                :
                routes.filter((route: any) => !route.protect).map((route: any, index: any) => {
                    return <Route key={index} path={route.path} element={React.createElement(route.component)} />
                })
            }
        </Routes>
    )
}

export default function AppRoute() {
    return (
        <BrowserRouter>
            <ProtectedRoute />
        </BrowserRouter>
    )
}
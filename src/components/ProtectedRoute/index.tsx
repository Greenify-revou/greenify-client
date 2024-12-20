import { useAuth } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('access_token')
      if (!isAuthenticated && !token) {
          router.push('/login')
      }
    }, [isAuthenticated])

  return (
    loading || isAuthenticated ? 
    (<div>{children}</div>)
    : 
    (<p>Loading...</p>)
  )
}

export default ProtectedRoute
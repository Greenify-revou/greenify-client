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
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated])

  return (
    loading || !isAuthenticated ? 
        (<p>Loading...</p>) 
        : 
        (
            <div>
                {children}
            </div>
        )
  )
}

export default ProtectedRoute
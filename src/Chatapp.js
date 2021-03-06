

import React from 'react'
import { AuthProvider } from './auth/AuthContext'
import { AppRouter } from './router/AppRouter'

export const Chatapp = () => {
    return (
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    )
}

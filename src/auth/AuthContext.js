
import React, { createContext, useCallback, useState } from 'react'
import { fethConToken, fethSinToken } from '../helpers/fetch';







export const AuthContext = createContext();

const initialState = {
    uid:null,
    checking: true,
    logged: false,
    name: null,
    email: null,
}



export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(initialState);

    const login = async( email, password) => {

        const resp = await fethSinToken('login', {email, password}, 'POST');

        const { emailDB } = resp; 

        if(resp.ok){
            localStorage.setItem('token', resp.token);
            setAuth({
                uid:emailDB.uid,
                checking: false,
                logged: true,
                name: emailDB.nombre,
                email: emailDB.email,
            })
        }

        return resp.ok;
    }
    const register = async (nombre, email, password) => {
        const resp = await fethSinToken('login/new', { nombre, email, password}, 'POST');

        console.log(resp)

        return resp.ok;
    }



    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');

        //si el token no existe

        if(!token){
            setAuth({
                uid:null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false 
        }

        const resp = await fethSinToken('login/renew');
        const { emailDB } = resp; 
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            setAuth({
                uid:emailDB.uid,
                checking: false,
                logged: true,
                name: emailDB.nombre,
                email: emailDB.email,
            })

            return true;
        }else{
            setAuth({
                uid:null,
                checking: false,
                logged: false,
                name: null,
                email: null,
             })
             return false;
        }

        
    }, [])

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>

            {children}
        </AuthContext.Provider>
    )
}
    
import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const userID = {
    name: '',
    lastname: '',
    typeClient: '',
    imagenusuario: '',
    secondlastname: '',
}
//
const apiUrl = {
    apiUrl: process.env.REACT_APP_API_URL,
    apiLocal: process.env.REACT_APP_API_LOCAL,
}

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(userID)
    const [api] = useState(apiUrl)
    const setUserId = (user) => {
        setUser({
            name: user.name,
            // lastname: user.lastname,
            typeClient: user.type,
            imagenusuario: user.imagenusuario,
            //  secondlastname: user.secondlastname,
        })
    }
    return (
        <AppContext.Provider value={{ user, setUserId, api }}>
            {children}
        </AppContext.Provider>
    )
}

import React from 'react'
import './ReserveButton.scss'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'

export const ReserveButton = (id) => {
    const navigate = useNavigate()
    const Context = React.useContext(AppContext)

    return (
        <>
            <button
                className="btn-reserve"
                onClick={() => {
                    if (Context.user.typeClient === '')
                        navigate(`/crearcuenta/cliente`)
                    else navigate(`/reservation/${id.id}`)
                }}
            >
                RESERVAR
            </button>
        </>
    )
}

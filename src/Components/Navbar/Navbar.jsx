import React from 'react'
import './Navbar.scss'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const Context = React.useContext(AppContext)
    const navigate = useNavigate()
    const apiUrl = Context.api.apiUrl
    const setUserId = Context.setUserId
    React.useEffect(() => {
        const token = localStorage.getItem('musicAppToken')
        axios
            .post(
                `${apiUrl}/auth/login/verify`,
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then((res) => {
                setUserId(res.data.payload[0])
            })
            .catch((error) => {})
    }, [apiUrl, setUserId])
    return (
        <div className="d-flex justify-content-between py-1 align-items-center bg-navbar">
            <img src="" alt="" />
            <p className="NombreApp">TumusAh</p>
            <Link to="/" className="text-decoration-none text-light">
                Inicio
            </Link>
            {Context.user.name !== '' ? (
                <></>
            ) : (
                <Link
                    to="/crearcuenta"
                    className="text-decoration-none text-light"
                >
                    Crear cuenta
                </Link>
            )}

            {Context.user.name !== '' ? (
                <></>
            ) : (
                <Link to="/login" className="text-decoration-none text-light">
                    Iniciar sesión
                </Link>
            )}

            {Context.user.name !== '' ? (
                Context.user.typeClient === 'Musico' ? (
                    <Link to="/profilemusician">Mi Perfil</Link>
                ) : (
                    <Link to="/userprofile">Mi Perfil</Link>
                )
            ) : (
                <></>
            )}

            {Context.user.name !== '' ? (
                Context.user.typeClient === 'Musico' ? (
                    <Link to="/musician/events">Mis Eventos</Link>
                ) : (
                    <Link to="/reservationaccepted">Mis Eventos</Link>
                )
            ) : (
                <></>
            )}
            {Context.user.name !== '' ? (
                <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                        navigate('/')
                        window.location.reload(true)
                        localStorage.removeItem('musicAppToken')
                        //
                    }}
                >
                    Cerrar sesion
                </button>
            ) : (
                <></>
            )}
            <img src="" alt="" />
        </div>
    )
}

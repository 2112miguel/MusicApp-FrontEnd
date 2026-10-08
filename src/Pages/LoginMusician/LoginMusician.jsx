import React from 'react'
import './LoginMusician.scss'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import Alert from 'react-bootstrap/Alert'

export const LoginMusician = () => {
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()
    const context = React.useContext(AppContext)
    const [show, setShow] = React.useState(false)

    const handleUser = (e) => {
        e.preventDefault()
        if (user !== null) {
            axios
                .post(`${context.api.apiUrl}/auth/login/musician`, {
                    correo: user.correo,
                    password: user.password,
                })
                .then((res) => {
                    if (res.data.success === true) {
                        localStorage.setItem(
                            'musicAppToken',
                            res.data.payload[0].token
                        )
                        navigate('/')
                        context.setUserId(res.data.payload[0])
                    } else setShow(true)
                })
                .catch((error) => {
                    setShow(true)
                })
        } else setShow(true)
    }

    return (
        <section>
            <NavbarOp2 />
            <Alert show={show} variant="danger">
                <Alert.Heading>Datos Incorrectos!</Alert.Heading>
            </Alert>
            <div className="LoginMusician">
                <div className="left-container">
                    <div className="shot1">
                        {' '}
                        <img
                            src="https://images.pexels.com/photos/5137290/pexels-photo-5137290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="foto1"
                            alt=""
                        />
                    </div>

                    <div className="shot1">
                        {' '}
                        <img
                            src="https://images.pexels.com/photos/5470113/pexels-photo-5470113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="foto1"
                            alt=""
                        />
                    </div>
                    <div className="shot1">
                        {' '}
                        <img
                            src="https://images.pexels.com/photos/878999/pexels-photo-878999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="foto1"
                            alt=""
                        />
                    </div>
                </div>

                <div className="LoginMusician-Container">
                    <p className="Login-Title">INICIAR SESIÓN COMO MÚSICO</p>

                    <form className="LoginMusician-Form">
                        <p className="NombreApp1">TumusAh</p>
                        <label className="labelloginmusician">
                            Correo electronico
                        </label>
                        <input
                            type="text"
                            className="input-mail"
                            onChange={({ target }) => {
                                setUser({ ...user, correo: target.value })
                            }}
                        />

                        <label className="labelloginmusician">Contraseña</label>
                        <input
                            type="password"
                            className="input-password"
                            onChange={({ target }) => {
                                setUser({ ...user, password: target.value })
                            }}
                        />

                        <p className="Login-footer">
                            ¿No tiene contraseña? &nbsp;
                            <Link
                                to="/crearcuenta"
                                className="linktocreateaccount"
                            >
                                Crear cuenta
                            </Link>
                        </p>
                        <button onClick={handleUser} className="BotonGeneral">
                            ENTRAR
                        </button>
                    </form>
                </div>
                <div className="left-container">
                    <div className="quote1">
                        <p>Las palabras llegan a los oidos</p>
                    </div>
                    <div className="quote1">
                        pero la musica llega al corazón
                    </div>
                    <div className="quote2">Tumusah</div>
                </div>
            </div>
        </section>
    )
}

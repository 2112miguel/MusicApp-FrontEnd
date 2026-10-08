import React, { useContext } from 'react'
import './Login.scss'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import Alert from 'react-bootstrap/Alert'

export const Login = () => {
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()
    const Context = useContext(AppContext)
    const [show, setShow] = React.useState(false)

    const handleUser = (e) => {
        e.preventDefault()
        if (user !== null) {
            axios
                .post(`${Context.api.apiUrl}/auth/login/clients`, {
                    correo: user.email,
                    password: user.password,
                })
                .then((response) => {
                    if (response.data.success === true) {
                        localStorage.setItem(
                            'musicAppToken',
                            response.data.payload[0].token
                        )
                        Context.setUserId(response.data.payload[0])
                        navigate('/')
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
            <div className="Login">
                <div className="left-container">
                    <div className="shot1">
                        {' '}
                        <img
                            src="https://images.pexels.com/photos/9202239/pexels-photo-9202239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="foto1"
                            alt="cantante"
                        />
                    </div>

                    <div className="shot1">
                        {' '}
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/5ea8c686e90f6a69b5967072/82f37eee-4bc6-4fad-a9ae-cc75d49d21c0/Gonzales%2C+Suemy.jpg"
                            className="foto1"
                            alt=""
                        />
                    </div>
                    <div className="shot1">
                        {' '}
                        <img
                            src="https://static.wixstatic.com/media/35b780_585c5277d75c48059aaabaa946ff2d13~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/35b780_585c5277d75c48059aaabaa946ff2d13~mv2.jpg"
                            className="foto1"
                            alt=""
                        />
                    </div>
                </div>
                <div className="Login-Container">
                    <form className="Login-Form">
                        <p className="NombreApp1">TumusAh</p>
                        <label className="labelloginmail">
                            Correo electronico
                        </label>
                        <input
                            type="text"
                            onChange={({ target }) => {
                                setUser({
                                    ...user,
                                    email: target.value,
                                })
                            }}
                            className="input-mail"
                        />

                        <label className="labelloginmail">Contraseña</label>
                        <input
                            type="password"
                            onChange={({ target }) => {
                                setUser({
                                    ...user,
                                    password: target.value,
                                })
                            }}
                            className="input-password"
                        />

                        <p className="Login-footer">
                            ¿No tiene contraseña? &nbsp;
                            <Link
                                to="/crearcuenta"
                                className="linktocreateaccount"
                            >
                                {' '}
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
                        <p>Cuando las palabras huyan</p>
                    </div>
                    <div className="quote1">expresate con musica</div>
                    <div className="quote2">Tumusah</div>
                </div>
            </div>
        </section>
    )
}

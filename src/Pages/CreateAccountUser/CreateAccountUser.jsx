import React from 'react'
import './CreateAccountUser.scss'
import axios from 'axios'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import { StatesSelect } from '../../Components/StatesSelect/StatesSelect'
import { MunicipalitySelect } from '../../Components/MunicipalitySelect/MunicipalitySelect'
import Alert from 'react-bootstrap/Alert'

export const CreateAccountUser = () => {
    const [showFalse, setShowFalse] = React.useState(false)
    const [user, setUser] = React.useState({
        name: '',
        lastname: '',
        secondlastname: '',
        email: '',
        password: '',
    })
    const [estado, setEstado] = React.useState(null)
    const context = React.useContext(AppContext)
    const navigate = useNavigate()

    const handleAccount = (e) => {
        e.preventDefault()
        //
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

        if (
            estado === null ||
            !estado.estado ||
            !estado.municipality ||
            user.email === '' ||
            user.lastname === '' ||
            user.name === '' ||
            user.password === '' ||
            user.secondlastname === ''
        )
            setShowFalse(true)
        else {
            if (user.email.match(mailformat)) {
                axios
                    .post(`${context.api.apiUrl}/clients`, {
                        name: user.name,
                        lastname: user.lastname,
                        secondlastname: user.secondlastname,
                        email: user.email,
                        password: user.password,
                        estado: estado.estado,
                        municipio: estado.municipality,
                    })
                    .then((response) => {
                        if (response.data.success === true) {
                            localStorage.setItem(
                                'musicAppToken',
                                response.data.payload[0].token
                            )
                            navigate('/')
                            context.setUserId(response.data.payload[0])
                        }
                    })
            } else setShowFalse(true)
        }
    }

    return (
        <section className="bodyCreateAccountUser">
            <NavbarOp2 />
            <Alert show={showFalse} variant="danger">
                <Alert.Heading className="d-flex justify-content-center">
                    Datos incorrectos
                </Alert.Heading>
            </Alert>
            <div className="CreateAccountUser">
                <div className="CreateAccountUser-Container">
                    <div className="CreateAccountUserFormulario">
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
                        <form className="CreateAccountUserForm">
                            <p className="Login-Title">
                                CREAR CUENTA COMO CLIENTE
                            </p>
                            <p className="Bienvenida">Bienvenido a</p>
                            <p className="NombreApp1">TumusAh</p>
                            <label className="labelCreateUse">Nombre</label>
                            <input
                                type="text"
                                className="createUser"
                                onChange={({ target }) => {
                                    setUser({ ...user, name: target.value })
                                }}
                            />

                            <label className="labelCreateUse">
                                Apellido paterno
                            </label>
                            <input
                                type="text"
                                className="createUser"
                                onChange={({ target }) => {
                                    setUser({ ...user, lastname: target.value })
                                }}
                            />

                            <label className="labelCreateUse">
                                Apellido materno
                            </label>
                            <input
                                type="text"
                                className="createUser"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        secondlastname: target.value,
                                    })
                                }}
                            />

                            <label className="labelCreateUse">
                                Escribe tu e-mail
                            </label>
                            <input
                                type="text"
                                className="createUser"
                                onChange={({ target }) => {
                                    setUser({ ...user, email: target.value })
                                }}
                            />
                            <label className="labelCreateUse">Estado</label>
                                <div className='state'>
                            <StatesSelect setEstado={setEstado} /></div>
                            {estado === null ? (
                                <></>
                            ) : (
                           <div className='state'>    <MunicipalitySelect
                                    setEstado={setEstado}
                                    estado={estado}
                                /></div>
                            )}
                            <label className="labelCreateUse">
                                Escribe una contraseña
                            </label>
                            <input
                                type="password"
                                className="createUser"
                                onChange={({ target }) => {
                                    setUser({ ...user, password: target.value })
                                }}
                            />

                            <button
                                className="BotonGeneral"
                                onClick={handleAccount}
                            >
                                CREAR CUENTA
                            </button>
                        </form>

                        <div className="left-container">
                            <div className="quote1">
                                <p>Regala un momento música</p>
                            </div>
                            <div className="quote1">
                                {' '}
                                y te recordaran para siempre
                            </div>
                            <div className="quote2">Tumusah</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

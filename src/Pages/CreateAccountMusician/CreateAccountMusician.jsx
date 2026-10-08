import React from 'react'
import './CreateAccountMusician.scss'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import { StatesSelect } from '../../Components/StatesSelect/StatesSelect'
import { MunicipalitySelect } from '../../Components/MunicipalitySelect/MunicipalitySelect'
import Alert from 'react-bootstrap/Alert'
import { GenderMusician } from '../../Components/GenderMusician/GenderMusician'
import { HoursMusician } from '../../Components/HoursMusician/HoursMusician'

export const CreateAccountMusician = () => {
    const [showFalse, setShowFalse] = React.useState(false)
    const [user, setUser] = React.useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        contrasenia: '',
        cobroPorHora: '',
        genero: '',
        nombreArtistico: '',
        horarioDiaDos: '',
        horarioFin: '',
        horarioInicio: '',
        horarioDiaUno: '',
    })
    const [estado, setEstado] = React.useState(null)
    const context = React.useContext(AppContext)
    const navigate = useNavigate()
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const handleAccount = (e) => {
        e.preventDefault()
        if (
            estado === null ||
            !estado.estado ||
            !estado.municipality ||
            user.correo === '' ||
            user.apellidoMaterno === '' ||
            user.nombre === '' ||
            user.apellidoPaterno === '' ||
            user.contrasenia === '' ||
            user.cobroPorHora === '' ||
            user.genero === '' ||
            user.nombreArtistico === '' ||
            user.horarioDiaDos === '' ||
            user.horarioDiaUno === '' ||
            user.horarioFin === '' ||
            user.horarioInicio === ''
        )
            setShowFalse(true)
        else {
            if (user.correo.match(mailformat)) {
                console.log(user)
                console.log(estado)
                axios
                    .post(`${context.api.apiUrl}/musician`, {
                        nombre: user.nombre,
                        apellidoPaterno: user.apellidoPaterno,
                        apellidoMaterno: user.apellidoMaterno,
                        correo: user.correo,
                        contrasenia: user.contrasenia,
                        cobroPorHora: user.cobroPorHora,
                        estado: estado.estado,
                        municipio: estado.municipality,
                        nombreArtistico: user.nombreArtistico,
                        genero: user.genero,
                        horarioDiaDos: user.horarioDiaDos,
                        horarioDiaUno: user.horarioDiaUno,
                        horarioFin: user.horarioFin,
                        horarioInicio: user.horarioInicio,
                    })
                    .then((response) => {
                        if (response.data.success === true) {
                            console.log(response.data)
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
        <section>
            <NavbarOp2 />
            <Alert show={showFalse} variant="danger">
                <Alert.Heading className="d-flex justify-content-center">
                    Datos incorrectos
                </Alert.Heading>
            </Alert>
            <div className="CreateAccountMusician">
                <div className="CreateAccountMusician-Container">
                    <div className="CreateAccountMusicianFormulario">
                        <div className="left-container">
                            <div className="shot1">
                                {' '}
                                <img
                                    src="https://images.pexels.com/photos/5862809/pexels-photo-5862809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="foto1"
                                    alt=""
                                />
                            </div>
                            <div className="shot1">
                                {' '}
                                <img
                                    src="https://images.pexels.com/photos/11794657/pexels-photo-11794657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="foto1"
                                    alt=""
                                />
                            </div>
                            <div className="shot1">
                                {' '}
                                <img
                                    src="https://images.pexels.com/photos/11794660/pexels-photo-11794660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="foto1"
                                    alt=""
                                />
                            </div>
                        </div>
                        <form className="CreateAccountMusicianForm">
                            <p className="Login-Title">
                                CREAR CUENTA COMO MÚSICO
                            </p>
                            <p className="Bienvenida">Bienvenido a</p>
                            <p className="NombreApp1">TumusAh</p>
                            <label className="labelCreateMusician">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        nombre: target.value,
                                    })
                                }}
                            />

                            <label className="labelCreateMusician">
                                Apellido paterno
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        apellidoPaterno: target.value,
                                    })
                                }}
                            />

                            <label className="labelCreateMusician">
                                Apellido materno
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        apellidoMaterno: target.value,
                                    })
                                }}
                            />

                            <label className="labelCreateMusician">
                                Nombre artistico
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        nombreArtistico: target.value,
                                    })
                                }}
                            />

                            <label className="labelCreateMusician">
                                Escribe tu e-mail
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        correo: target.value,
                                    })
                                }}
                            />
                            <label className="labelCreateMusician">
                                Cobro por hora
                            </label>
                            <input
                                type="text"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        cobroPorHora: target.value.replace(
                                            /\D/g,
                                            ''
                                        ),
                                    })
                                }}
                            />
                            <label className="labelCreateMusician">
                                Genero
                            </label>
                            <div className="state"> <GenderMusician user={user} setUser={setUser} /></div>

                            <label className="labelCreateUse">Estado</label>
                            <div className="state">
                                <StatesSelect setEstado={setEstado} />
                            </div>
                            {estado === null ? (
                                <></>
                            ) : (
                                <div className="state">
                                    <MunicipalitySelect
                                        setEstado={setEstado}
                                        estado={estado}
                                    />
                                </div>
                            )}
                            <HoursMusician setUser={setUser} user={user} />
                            <label className="labelCreateMusician">
                                Escribe una contraseña
                            </label>
                            <input
                                type="password"
                                className="createMusician"
                                onChange={({ target }) => {
                                    setUser({
                                        ...user,
                                        contrasenia: target.value,
                                    })
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
                                <p>Soy músico </p>
                            </div>
                            <div className="quote1">toco almas</div>
                            <div className="quote2">Tumusah</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

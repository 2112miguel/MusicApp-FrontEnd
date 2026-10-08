import React from 'react'
import './Reservation.scss'
import { useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import axios from 'axios'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { StatesSelect } from '../../Components/StatesSelect/StatesSelect'
import { MunicipalitySelect } from '../../Components/MunicipalitySelect/MunicipalitySelect'

export const Reservation = () => {
    const Context = React.useContext(AppContext)
    const token = localStorage.getItem('musicAppToken')
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [event, setEvent] = React.useState({
        descripcion: '',
        colonia: '',
        calle: '',
        numero: '',
        titulo: '',
    })
    const [dayOne, setdayOne] = React.useState(new Date())
    const [dayTwo, setdayTwo] = React.useState(new Date())
    const [musico, setMusico] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [showFalse, setShowFalse] = React.useState(false)
    const [estado, setEstado] = React.useState(null)

    React.useEffect(() => {
        axios.get(`${Context.api.apiUrl}/musician/id/${id}`).then((res) => {
            setMusico(res.data.payload[0])
            setLoading(false)
        })
    }, [Context.api.apiUrl, id])

    const theme = createTheme({
        typography: {
            fontSize: 14,
            fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
            color: 'red',
        },
        palette: {
            primary: {
                main: '#fd4948',
            },
            secondary: {
                main: '#fd4948',
            },
        },
    })

    const handleChangeDayOne = (newdayOne) => {
        setdayOne(newdayOne)
    }

    const handleChangeDayTwo = (newdayTwo) => {
        setdayTwo(newdayTwo)
    }

    const createEvent = (e) => {
        e.preventDefault()

        const dateOne = new Date(dayOne)
        const dateTwo = new Date(dayTwo)
        const hourOne = `${dateOne.getHours()}:${dateOne.getMinutes()}`
        const hourTwo = `${dateTwo.getHours()}:${dateTwo.getMinutes()}`
        const parseDayOne = Date.parse(dayOne)
        const parseDayTwo = Date.parse(dayTwo)
        let diff = (dateOne.getTime() - dateTwo.getTime()) / 1000
        diff /= 60 * 60
        const result =
            Math.abs(Math.round(diff)) * parseFloat(musico.cobroPorHora)

        if (
            parseDayOne === parseDayTwo ||
            parseDayOne > parseDayTwo ||
            event === null ||
            estado === null ||
            !estado.estado ||
            !estado.municipality ||
            event.calle === '' ||
            event.colonia === '' ||
            event.descripcion === '' ||
            event.numero === '' ||
            event.titulo === ''
        ) {
            setShowFalse(true)
        } else {
            axios
                .post(
                    `${Context.api.apiUrl}/event`,
                    {
                        descripcion: event.descripcion,
                        fechaInicio: Date.parse(dayOne),
                        horaInicio: hourOne,
                        fechaFinalizacion: Date.parse(dayTwo),
                        horaFinalizacion: hourTwo,
                        musicoId: id,
                        colonia: event.colonia,
                        numero: event.numero,
                        calle: event.calle,
                        titulo: event.titulo,
                        pago: result,
                        estado: estado.estado,
                        municipio: estado.municipality,
                    },
                    {
                        headers: {
                            token: token,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.success === true) {
                        setShow(true)
                        setTimeout(() => {
                            navigate('/reservationaccepted')
                        }, 1500)
                    } else {
                        setShowFalse(true)
                    }
                })
        }
    }

    return (
        <div>
            <NavbarOp2 />
            <section>
                <Alert show={show} variant="success">
                    <Alert.Heading className="d-flex justify-content-center">
                        Evento creado
                    </Alert.Heading>
                    <div className="d-flex justify-content-center">
                        <p>El evento fue creado y enviado al musico</p>
                    </div>
                </Alert>
                <Alert show={showFalse} variant="danger">
                    <Alert.Heading className="d-flex justify-content-center">
                        Datos incorrectos
                    </Alert.Heading>
                </Alert>
            </section>
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="Reservation text-white">
                    <div className="Reservation-Container">
                        <p className="Login-Title">RESERVACIÓN</p>
                        <div className="Reservation-Content">
                            <div className="reservationData">
                                <p className="dataTitles">
                                    DATOS GRUPO/ARTISTA
                                </p>
                                <img src={musico.imagenMusico} alt="" />
                                <p className="datatext">
                                    Grupo: {musico.nombreArtistico}
                                    {}
                                </p>
                                <p className="datatext">
                                    Area de covertura: {musico.estado}
                                </p>
                                <p className="datatext">
                                    Género: {musico.genero}
                                </p>
                            </div>
                            <form>
                                <p className="dataTitles2">Titulo del evento</p>
                                <input
                                    type="text"
                                    className="inputReservation"
                                    onChange={({ target }) => {
                                        setEvent({
                                            ...event,
                                            titulo: target.value,
                                        })
                                    }}
                                />
                                <label className="labelreservation">
                                    Descripción del evento
                                </label>
                                <input
                                    type="text"
                                    className="inputReservation"
                                    onChange={({ target }) => {
                                        setEvent({
                                            ...event,
                                            descripcion: target.value,
                                        })
                                    }}
                                />
                                <p className="dataTitles">
                                    DIRECCIÓN DEL EVENTO
                                </p>
                                <label className="labelreservation">
                                    Colonia
                                </label>
                                <input
                                    type="text"
                                    className="inputReservation"
                                    onChange={({ target }) => {
                                        setEvent({
                                            ...event,
                                            colonia: target.value,
                                        })
                                    }}
                                />

                                <label className="labelreservation">
                                    Calle
                                </label>
                                <input
                                    type="text"
                                    className="inputReservation"
                                    onChange={({ target }) => {
                                        setEvent({
                                            ...event,
                                            calle: target.value,
                                        })
                                    }}
                                />

                                <label className="labelreservation">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    className="inputReservation"
                                    onChange={({ target }) => {
                                        setEvent({
                                            ...event,
                                            numero: target.value,
                                        })
                                    }}
                                />

                                <label className="labelreservation">
                                    Estado
                                </label>

                                <div className="stateSelect">
                                    <StatesSelect setEstado={setEstado} />
                                </div>
                                {estado == null ? (
                                    <></>
                                ) : (
                                    <div className="stateSelect">
                                        <MunicipalitySelect
                                            setEstado={setEstado}
                                            estado={estado}
                                        />
                                    </div>
                                )}
                                <section className="calendar">
                                    <p className="dataTitles2">
                                        Dia y hora de inicio
                                    </p>
                                    <ThemeProvider theme={theme}>
                                        <div className="my-3 text-white">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <Stack spacing={3}>
                                                    <DateTimePicker
                                                        label="Date&Time picker"
                                                        value={dayOne}
                                                        onChange={
                                                            handleChangeDayOne
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                sx={{
                                                                    svg: {
                                                                        color: '#fff',
                                                                    },
                                                                    input: {
                                                                        color: '#fff',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </div>
                                        <p className="dataTitles2">
                                            Dia y hora de finalizacion
                                        </p>
                                        <div className="my-3">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <Stack spacing={3}>
                                                    <DateTimePicker
                                                        label="Date&Time picker"
                                                        value={dayTwo}
                                                        onChange={
                                                            handleChangeDayTwo
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                sx={{
                                                                    svg: {
                                                                        color: '#fff',
                                                                    },
                                                                    input: {
                                                                        color: '#fff',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                        </div>
                                    </ThemeProvider>
                                </section>
                                <button
                                    className="BotonGeneral"
                                    onClick={createEvent}
                                >
                                    RESERVAR EVENTO
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

import React from 'react'
import './ReservationAccepted.scss'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import Alert from 'react-bootstrap/Alert'
import { CardEventProgress } from '../../Components/CardEventProgress/CardEventProgress'
import { CardEventPayment } from '../../Components/CardEventPayment/CardEventPayment'

export const ReservationAccepted = () => {
    const [eventsAccepted, setEventsAccepted] = React.useState([])
    const [eventsProgress, setEventsProgress] = React.useState([])
    const [showAlertAccept, setShowAlertAccept] = React.useState(false)
    const [showAlertRefused, setShowAlertRefused] = React.useState(false)
    const Context = React.useContext(AppContext)
    const [Loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const token = localStorage.getItem('musicAppToken')
        axios
            .get(`${Context.api.apiUrl}/event/client/accepted`, {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setEventsAccepted(res.data.payload)
            })
        axios
            .get(`${Context.api.apiUrl}/event/client/progress`, {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setEventsProgress(res.data.payload)
            })
        setLoading(false)
    }, [Context.api.apiUrl])

    return (
        <div>
            <NavbarOp2 />
            <Alert show={showAlertAccept} variant="success">
                <Alert.Heading>Evento Cumplido!</Alert.Heading>
            </Alert>
            <Alert show={showAlertRefused} variant="danger">
                <Alert.Heading>Evento No cumplido!</Alert.Heading>
            </Alert>
            {Loading ? (
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="">
                    <div className="ReservationAccepted-container">
                        <p className="InicioSesion-Title">
                            AGENDA DE EVENTOS
                            <p className="NombreApp1">TumusAh</p>
                        </p>

                        <div className="ReservationAccepted-content">
                            <div className="tarjetasPago">
                                {eventsAccepted.map((event, key) => {
                                    return (
                                        <CardEventPayment
                                            key={key}
                                            event={event}
                                        />
                                    )
                                })}
                            </div>
                            <p className="EventosporHacer">
                                EVENTOS POR REALIZAR
                            </p>
                            <div className="eventoenProceso">
                                {eventsProgress.map((event, key) => {
                                    //
                                    return (
                                        <main>
                                            <CardEventProgress
                                                key={key}
                                                event={event}
                                                setShowAlertAccept={
                                                    setShowAlertAccept
                                                }
                                                setShowAlertRefused={
                                                    setShowAlertRefused
                                                }
                                            />
                                        </main>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

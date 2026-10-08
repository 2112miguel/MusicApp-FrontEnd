import React from 'react'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CardAcceptedEvent.scss'

export const CardAcceptedEvent = ({
    event,
    setShowAlertRefused,
    setShowAlertAccept,
}) => {
    const Context = React.useContext(AppContext)
    const token = localStorage.getItem('musicAppToken')
    const navigate = useNavigate()
    const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ]
    const days = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ]

    const secondDate = new Date(event.fechaFinalizacion)
    const firstDate = new Date(event.fechaInicio)
    const firstHour =
        firstDate.getMinutes() < 10
            ? `0${firstDate.getMinutes()}`
            : firstDate.getMinutes()
    const secondHour =
        secondDate.getMinutes() < 10
            ? `0${secondDate.getMinutes()}`
            : secondDate.getMinutes()

    return (
        <div class="col-4 card-accepted-event-container">
            <h2>{event.titulo}</h2>
            <div className="text-card-container">
                <h4>{event.clienteId[0].name}</h4>
                <article className="d-flex">
                    <h5 className="me-2">Telefono: </h5>
                    <span>{`${event.clienteId[0].phone}`}</span>
                </article>
                <article className="d-flex">
                    <h5 className="me-2">Direccion</h5>
                    <span>{`${event.colonia} ${event.calle}`}</span>
                </article>
                <h5>Fecha</h5>
                <article>
                    <span>
                        {' '}
                        {`${days[firstDate.getDay()]} ${firstDate.getDate()} ${
                            months[firstDate.getMonth()]
                        } ${firstDate.getHours()}:${firstHour}`}
                    </span>
                </article>
                <article>
                    <span>
                        {' '}
                        {`${
                            days[secondDate.getDay()]
                        } ${secondDate.getDate()} ${
                            months[secondDate.getMonth()]
                        } ${secondDate.getHours()}:${secondHour}`}
                    </span>
                </article>
                <p>{event.descripcion}</p>
            </div>

            <section className="buttons-container">
                <button
                    type="button"
                    class="button-denegade-style1"
                    onClick={() => {
                        axios
                            .patch(
                                `${Context.api.apiUrl}/event/update/${event._id}`,
                                { status: 'rechazado' },
                                {
                                    headers: {
                                        token: token,
                                    },
                                }
                            )
                            .then((res) => {
                                if (res.data.success === true) {
                                    setShowAlertRefused(true)
                                    setTimeout(() => {
                                        navigate('/')
                                    }, 1500)
                                } else {
                                    alert('Error')
                                    navigate('/userprofile')
                                }
                            })
                    }}
                >
                    Rechazar
                </button>
                <button
                    className="button-acept-style1"
                    onClick={() => {
                        axios
                            .patch(
                                `${Context.api.apiUrl}/event/update/${event._id}`,
                                { status: 'aceptado' },
                                {
                                    headers: {
                                        token: token,
                                    },
                                }
                            )
                            .then((res) => {
                                if (res.data.success === true) {
                                    setShowAlertAccept(true)
                                    setTimeout(() => {
                                        navigate('/')
                                    }, 1500)
                                } else {
                                    alert('Error')
                                    navigate('/userprofile')
                                }
                            })
                    }}
                >
                    Aceptar
                </button>
            </section>
        </div>
    )
}

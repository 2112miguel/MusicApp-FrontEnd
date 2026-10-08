import React from 'react'
import './CardNewEvents.scss'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CardNewEvents = (event) => {
    const eventSave = event.event
    const Context = React.useContext(AppContext)
    const token = localStorage.getItem('musicAppToken')
    const navigate = useNavigate()
    const handleAcceptEvent = (e) => {
        e.preventDefault()
        axios
            .patch(
                `${Context.api.apiUrl}event/update/${event.event._id}`,
                { aceptado: true },
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    alert('Evento Aceptado')
                    navigate('/')
                }
            })
    }
    const handleDeclineEvent = (e) => {
        e.preventDefault()
        axios
            .patch(
                `${Context.api.apiUrl}event/update/${event.event._id}`,
                { aceptado: false },
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    alert('Evento Rechazado')
                    navigate('/')
                }
            })
    }
    return (
        <div className="CardNewEvents">
            <div className="CardNewEvents-container">
                <div className="CardNewEvents-content">
                    <div className="cardEventonuevo">
                        <p className="newEventText">
                            Cliente: {eventSave.nameClient}
                        </p>
                        <p className="newEventText">
                            {' '}
                            Descripcion:{eventSave.descripcion}
                        </p>
                        <p className="newEventText">
                            Dirección: Calle aztecas #35 Col. Narvaez Entidad:
                            Iztapalapa CDMX
                        </p>
                        <p className="newEventText">Marzo de 5pm a 2am </p>
                        <form className="newEventButtons">
                            <button
                                className="acceptEventbtn"
                                onClick={handleAcceptEvent}
                            >
                                ACEPTAR
                            </button>
                            <button
                                className="rejectEventbtn"
                                onClick={handleDeclineEvent}
                            >
                                RECHAZAR
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

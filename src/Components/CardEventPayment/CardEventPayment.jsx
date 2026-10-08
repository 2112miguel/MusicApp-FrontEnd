import React from 'react'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import './CardEventPayment.scss'

export const CardEventPayment = ({ event }) => {
    const Context = React.useContext(AppContext)

    return (
        <section className="tarjeta">
            <article className="card">
                <div className="musicoImgContenedor">
                    {' '}
                    <img
                        src={event.musicoId[0].imagenMusico}
                        className="musicoImg"
                        alt={event.musicoId[0].nombreArtistico}
                    />
                </div>

                <div className="nombregrupo">
                    <p className="textcardtitle">
                        GRUPO/ARTISTA: {event.musicoId[0].nombreArtistico}
                    </p>
                </div>
                <div className="card-title">
                    <p className="textcard1">
                        <strong>DATOS EVENTO: </strong>
                    </p>
                </div>

                <div className="card-text">
                    <p className="textcard1">
                        {' '}
                        <strong>Tipo de evento:</strong>
                        &nbsp; {event.descripcion}
                    </p>

                    <p className="textcard1">
                        <strong>Calle:</strong>
                        &nbsp;&nbsp; {event.calle}
                    </p>
                    <p className="textcard1">
                        <strong>Colonia:</strong>
                        &nbsp; {event.colonia}
                    </p>
                    <p className="textcard1">
                        <strong>Ciudad: </strong>
                        &nbsp;
                        {event.ciudad}
                    </p>
                    <p className="textcard1">
                        <strong>Dia:</strong>&nbsp;{' '}
                        {event.fechaInicio.slice(0, 10)}
                    </p>
                    <p className="textcard1">
                        <strong>Hora: </strong>
                        &nbsp; De {event.horaInicio} a {event.horaFinalizacion}
                    </p>
                </div>
            </article>

            <button
                className="BotonGeneral3"
                onClick={() => {
                    axios
                        .post(`${Context.api.apiUrl}/payment/create-payments`, {
                            price: event.pago,
                            custom_id: `${event._id}`,
                        })
                        .then((res) => {
                            console.log(res.data)
                            //window.open(res.data.data.links[1].href )
                            window.location.href = res.data.data.links[1].href
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }}
            >
                REALIZAR PAGO DEL SERVICIO
            </button>
        </section>
    )
}

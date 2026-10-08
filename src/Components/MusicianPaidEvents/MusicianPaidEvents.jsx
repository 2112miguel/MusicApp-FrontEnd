import React from 'react'
import './MusicianPaidEvents.scss'

export const MusicianPaidEvents = ({ event }) => {
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
        <div className="MusicianPaidEvents">
            <div className="MusicianPaidEvents-Container">
                <div className="MusicianPaidEvents-Content">
                    <div className="cardMusicianPaidEvents">
                        <h5 className="text-center m-4">DATOS DEL CLIENTE</h5>
                        <p className="reservedtext">
                            Titulo del evento:&nbsp;
                            <span className="reservedtext-styled">
                                {event.titulo}
                            </span>
                        </p>
                        <p className="reservedtext">
                            Cliente:&nbsp;
                            <span className="reservedtext-styled">
                                {event.clienteId[0].name}
                            </span>
                        </p>
                        <p className="reservedtext">
                            Direccion:&nbsp;
                            <span className="reservedtext-styled">
                                {`${event.colonia} ${event.numero}`}
                            </span>
                        </p>
                        <p className="reservedtext">
                            Ciudad:&nbsp;
                            <span className="reservedtext-styled">
                                {event.clienteId[0].estado}
                            </span>
                        </p>
                        <p className="reservedtext">
                            Fecha:{' '}
                            <span className="reservedtext-styled">
                                {`${
                                    days[firstDate.getDay()]
                                } ${firstDate.getDate()} ${
                                    months[firstDate.getMonth()]
                                } ${firstDate.getHours()}:${firstHour}`}
                            </span>{' '}
                            <span className="reservedtext-styled">
                                {`${
                                    days[secondDate.getDay()]
                                } ${secondDate.getDate()} ${
                                    months[secondDate.getMonth()]
                                } ${secondDate.getHours()}:${secondHour}`}
                            </span>
                        </p>

                        <p className="reservedtext">
                            Descripcion del Evento:
                            <span className="reservedtext-styled description-container">
                                {event.descripcion}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

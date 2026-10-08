import React from 'react'
import Card from 'react-bootstrap/Card'
import './MusicianCardXL.scss'
import { ButtonTranspOrg } from '../ButtonTranspOrg/ButtonTranspOrg'
import { useNavigate } from 'react-router-dom'

export const MusicianCardXL = (musico) => {
    const navigate = useNavigate()

    return (
        <Card
            className="imgcard-container"
            onClick={() => {
                navigate(`/musician/description/${musico.musico.id}`)
            }}
        >
            <Card.Img
                className="img-card-edit"
                src={musico.musico.imagenMusico}
            />
            <Card.Body className="card-boddy-text-edit">
                <Card.Title style={{ fontSize: '33px', color: 'white' }}>
                    {musico.musico.nombreArtistico}
                </Card.Title>
                <Card.Text style={{ color: 'white' }}>
                    {musico.musico.descripcion}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="cardFooter">
                <div className="d-flex align-items-center">
                    <h5
                        style={{ color: 'white' }}
                    >{`${musico.musico.horarioDiaDos} a ${musico.musico.horarioDiaUno} de  ${musico.musico.horarioInicio} ${musico.musico.horarioFin}`}</h5>
                </div>
                <ButtonTranspOrg
                    label={`$${musico.musico.cobroPorHora}/h ${musico.musico.estado} `}
                />
            </Card.Footer>
        </Card>
    )
}

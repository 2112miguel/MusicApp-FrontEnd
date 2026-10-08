import React from 'react'
import './Payment.scss'

export const Payment = () => {
    return (
        <div>
            <div className="Payment">
                <div className="Payment-container">
                    <div className="Payment-content">
                        <p className="Login-Title">PAGO DE RESERVACIÓN</p>
                        <div className="artistReservedData">
                            <p className="dataTitles"> DATOS ARTISTA</p>
                            <p className="datatext">Grupo reservado: Fusión</p>
                            <p className="datatext">Area de covertura: CDMX</p>
                            <p className="datatext">Dia: 24 de Febrero </p>
                            <p className="datatext">Hora: De 1pm a 2am</p>
                            <p className="datatext">Costo Total: 6000$MXN</p>
                        </div>
                        <div className="directions">
                            <p className="dataTitles">DIRECCIÓN DEL EVENTO</p>
                            <p className="datatext">Calle: Petunias</p>
                            <p className="datatext">Colonia: Regenración</p>
                            <p className="datatext">Numero: 23</p>
                            <p className="datatext">Municipio: Iztapalapa</p>
                            <p className="datatext">Ciudad: CDMX</p>
                        </div>
                        <button className="BotonGeneral">Paypal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

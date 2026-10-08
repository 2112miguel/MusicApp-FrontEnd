////jsx

import React from 'react'
import './CreateAccount.scss'
import { Link } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
export const CreateAccount = () => {
    return (
        <div>
            <NavbarOp2 />
            <div className="CreateAccount">
                 <div className='left-container'>
                    <div className="shot1"> <img src='https://images.pexels.com/photos/210766/pexels-photo-210766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='foto1' alt="" /></div>             
                    <div className="shot1"> <img src='https://images.pexels.com/photos/2921541/pexels-photo-2921541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  className='foto1' alt="" /></div>
                    <div className="shot1"> <img src='https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='foto1' alt="" /></div>

                </div>

                <div className="CreateAccount-Container">
                    <p className="CreateAccount-Title">CREAR CUENTA</p>
                    <p className="Bienvenida">Bienvenido a</p>
                    <p className="NombreApp1">TumusAh</p>

                    <div className="usuarios">
                        <div className="SoyCliente">
                            <p className="TitleSoyCliente">SOY CLIENTE</p>
                            <hr className="hr"></hr>
                            <p className="general-text">
                                "TumusAh" te ayuda a encontrar a tu músico en
                                todo momento y cerca de ti.{' '}
                            </p>
                            <Link to="/crearcuenta/cliente">
                                <button className="registrate">
                                    REGISTRATE
                                </button>
                            </Link>
                        </div>
                        <div className="SoyMusico">
                            <p className="TitleSoyMusico">SOY MÚSICO</p>
                            <hr className="hr"></hr>
                            <p className="general-text">
                                Registrate en "TumusAh" como artista músico y
                                encuentra tu evento
                            </p>
                            <Link to="/crearcuenta/musican">
                                <button className="registrate">
                                    REGISTRATE
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='left-container'>
                    <div className='quote1'><p>Enbriaga al silencio</p>
                    </div>
                    <div className='quote1'>con el sonido de la música</div>
                    <div className='quote2'>Tumusah</div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import './InicioSesion.scss'
import { Link } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'

export const InicioSesion = () => {
    return (
        <div>
            <NavbarOp2 />
            <div className="InicioSesion">
                <div className='left-container'>
                    
                    <div className="shot1"> <img src="https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2019/05/M%C3%BAsico-triste-shutterstock_143096134.jpg" className='foto1' alt="" /></div>
                    
                    
                    <div className="shot1"> <img src="https://musicopolix.com/blog/wp-content/uploads/2014/10/musicos-en-activo-1024x5761.jpg" className='foto1' alt="" /></div>
                    <div className="shot1"> <img src="http://musicologos.la/wp-content/uploads/2017/04/1400a-1.jpg" className='foto1' alt="" /></div>

                </div>
               
              
                <div className="InicioSesion-Container">
                    <p className="CreateAccount-Title">INICIAR SESIÓN</p>
                    <p className="Bienvenida">Bienvenido a</p>
                    <p className="NombreApp1">TumusAh</p>
                    <div className="BotonesInicio">

                        <br />
                        <br />
                        <br />
                        <Link to="/login/client">
                            <button className="BotonGeneral">SOY CLIENTE</button>
                        </Link>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/login/musican">
                            <button className="BotonGeneral">SOY MÚSICO</button>
                        </Link>
                    </div>
                </div>
                <div className='left-container'>
                    <div className='quote1'><p>Dejate guiar</p>
                    </div>
                    <div className='quote1'>por la musa de la música</div>
                    <div className='quote2'>Tumusah</div>
                </div>
            </div>
        </div>
    )
}

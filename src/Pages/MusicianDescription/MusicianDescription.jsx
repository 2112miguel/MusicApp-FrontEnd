import React from 'react'
import { ReserveButton } from '../../Components/ReserveButton/ReserveButton'
import './MusicianDescription.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../../Context/AppContext'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import Header from '../../Components/Header/Header'
export const MusicianDescription = () => {
    const { id } = useParams()
    const Context = React.useContext(AppContext)
    const [musico, setMusico] = React.useState([])
    const [Loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        axios.get(`${Context.api.apiUrl}/musician/id/${id}`).then((res) => {
            setMusico(res.data.payload)
            setLoading(false)
        })
    }, [Context.api.apiUrl, id])

    return (
        <section className="sectionMusicanDes">
            <NavbarOp2 />

            {Loading ? (
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>
                    <Header img={musico[0].imagenMusico} />
                    <div className="page-container">
                        <div className="group-container">
                            <div className="img-info-container">
                                <img
                                    className="img-musician"
                                    src={musico[0].imagenMusico}
                                    alt="img-musician"
                                />
                                <div className="info-group-container">
                                    <span className="band">
                                        {musico[0].nombreArtistico}
                                    </span>
                                    <span className="band">
                                        Genero: {musico[0].genero}
                                    </span>
                                    {Context.user.typeClient !== 'Musico' ? (
                                        <ReserveButton id={musico[0].id} />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="price-city-container">
                                <span className="city">
                                    ${musico[0].cobroPorHora}/hora
                                </span>
                                <span className="city">
                                    Area de covertura: Guadalajara
                                </span>
                            </div>
                        </div>
                        <div className="complementary-info">
                            <div className="times">
                                <p className="datestext">
                                    DÍAS Y HORAS DE SERVICÍO
                                </p>
                                <p className="datestext1">
                                    {musico[0].horarioDiaUno} de{' '}
                                    {musico[0].horarioInicio} a{' '}
                                    {musico[0].horarioFin}
                                    {` ${musico[0].horarioDiaDos}`}
                                </p>
                            </div>
                            <div className="about-group">
                                <p className="datestext">ACERCA DE</p>
                                <span className="datestext">
                                    {musico[0].descripcion}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

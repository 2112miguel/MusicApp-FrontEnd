import React from 'react'
import './LandingPage.scss'
import { CarouselComp } from '../../Components/Carousel/CarouselComp'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import { MusicianCardXL } from '../../Components/MusicianCardXL/MusicianCardXL'
import { FamousPhrase } from '../../Components/FamousPhrase/FamousPhrase'
import { FooterPage } from '../../Components/FooterPage/FooterPage'
import axios from 'axios'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

export const LandingPage = () => {
    const Context = React.useContext(AppContext)
    const [musicos, setMusicos] = React.useState([])
    const navigate = useNavigate()
    const [showClient, setShowClient] = React.useState(false)
    const [showMusician, setShowMusician] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const apiUrl = Context.api.apiUrl
    const userType = Context.user.typeClient

    const loadMusicians = React.useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(`${apiUrl}/musician/all`, {
                timeout: 15000,
            })
            setMusicos(response.data.payload)
        } catch (requestError) {
            setError(
                'No pudimos cargar los músicos. Verifica tu conexión e inténtalo de nuevo.'
            )
        } finally {
            setLoading(false)
        }
    }, [apiUrl])

    React.useEffect(() => {
        loadMusicians()
    }, [loadMusicians])

    React.useEffect(() => {
        const token = localStorage.getItem('musicAppToken')

        if (userType === 'Client') {
            axios
                .get(`${apiUrl}/event/client/eventAccept`, {
                    headers: {
                        token: token,
                    },
                })
                .then((res) => {
                    if (res.data.payload) {
                        setShowClient(true)
                    }
                })
        }
        if (userType === 'Musico') {
            axios
                .get(`${apiUrl}/event/musician/newEvent`, {
                    headers: {
                        token: token,
                    },
                })
                .then((res) => {
                    if (res.data.payload) {
                        console.log(res.data)
                        setShowMusician(true)
                    }
                })
        }
    }, [apiUrl, userType])

    return (
        <div style={{ backgroundColor: '#01172f' }}>
            <NavbarOp2 />
            <main>
                <CarouselComp />
                <Alert show={showClient} variant="success">
                    <Alert.Heading>¡Evento aceptado!</Alert.Heading>
                    <p>El músico aceptó tu evento. Ya puedes ir a pagarlo.</p>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/reservationaccepted')}
                        >
                            Ir a mis eventos
                        </button>
                    </div>
                </Alert>
                <Alert show={showMusician} variant="success">
                    <Alert.Heading>¡Tienes nuevos eventos!</Alert.Heading>
                    <p>Revísalos para aceptarlos o rechazarlos.</p>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/musician/events')}
                        >
                            Ir a mis eventos
                        </button>
                    </div>
                </Alert>
                <div className="FamousPhrase-Container">
                    <FamousPhrase />
                </div>
                <div className="MusicianCards-Container">
                    {loading && (
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Cargando músicos...
                            </span>
                        </div>
                    )}
                    {error && (
                        <div className="landing-error" role="alert">
                            <p>{error}</p>
                            <button
                                className="btn btn-outline-light"
                                onClick={loadMusicians}
                            >
                                Reintentar
                            </button>
                        </div>
                    )}
                    {!loading && !error && musicos.length === 0 && (
                        <p className="text-white">
                            No hay músicos disponibles por el momento.
                        </p>
                    )}
                    {!loading &&
                        !error &&
                        musicos.map((musico) => (
                            <MusicianCardXL
                                key={musico.id ?? musico._id}
                                musico={musico}
                            />
                        ))}
                </div>
            </main>
            <FooterPage />
        </div>
    )
}

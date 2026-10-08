import React from 'react'
import './NavbarOp2.scss'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { ButtonTranspOrg } from '../ButtonTranspOrg/ButtonTranspOrg'
import { ButtonOrange } from '../ButtonOrange/ButtonOrange'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const NavbarOp2 = () => {
    const Context = React.useContext(AppContext)
    const navigate = useNavigate()
    const apiUrl = Context.api.apiUrl
    const setUserId = Context.setUserId
    React.useEffect(() => {
        const token = localStorage.getItem('musicAppToken')
        axios
            .post(
                `${apiUrl}/auth/login/verify`,
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then((res) => {
                setUserId(res.data.payload[0])
            })
            .catch((error) => {})
    }, [apiUrl, setUserId])
    return (
        <Navbar
            collapseOnSelect
            id="Navbar"
            expand="lg"
            sticky="top"
            variant="dark"
        >
            <Container>
                <Navbar.Brand
                    href="/"
                    style={{ color: '#FD4948', fontWeight: 'bold' }}
                >
                    TuMusAh
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="/"
                            style={{ color: '#FD4948', fontWeight: '600' }}
                        >
                            
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {Context.user.name !== '' ? (
                            Context.user.typeClient === 'Musico' ? (
                                <ButtonTranspOrg
                                    href="/profilemusician"
                                    label="Mi perfil"
                                />
                            ) : (
                                <ButtonTranspOrg
                                    href="/userprofile"
                                    label="Mi perfil"
                                />
                            )
                        ) : (
                            <ButtonTranspOrg
                                href="/login"
                                label="Inicia Sesion"
                            />
                        )}
                        {Context.user.name !== '' ? (
                            Context.user.typeClient === 'Musico' ? (
                                <ButtonTranspOrg
                                    href="/musician/events"
                                    label="Mis Eventos"
                                />
                            ) : (
                                <ButtonTranspOrg
                                    href="/reservationaccepted"
                                    label="Mis Eventos"
                                />
                            )
                        ) : (
                            <></>
                        )}

                        {Context.user.name !== '' ? (
                            <button
                                className="Button-Close-session"
                                onClick={() => {
                                    navigate('/')
                                    window.location.reload(true)
                                    localStorage.removeItem('musicAppToken')
                                    //
                                }}
                            >
                                Cerrar sesion
                            </button>
                        ) : (
                            <ButtonOrange
                                href="/crearcuenta"
                                label="Registrate"
                            />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

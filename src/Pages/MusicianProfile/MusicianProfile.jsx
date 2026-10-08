import React from 'react'
import './MusicianProfile.scss'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import Musico from '../../Components/Musico/Musico'
export const MusicianProfile = () => {
    const Context = React.useContext(AppContext)
    const [musician, setMusician] = React.useState([])

    React.useEffect(() => {
        const token = localStorage.getItem('musicAppToken')
        axios
            .get(`${Context.api.apiUrl}/musician`, {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setMusician(res.data.payload[0])
            })
    }, [Context.api.apiUrl])

    return (
        <div>
            <NavbarOp2 />

            <Musico musician={musician}></Musico>
        </div>
    )
}

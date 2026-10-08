import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CreateAccount } from './Pages/CreateAccount/CreateAccount'
import { InicioSesion } from './Pages/InicioSesion/InicioSesion'
import { LoginMusician } from './Pages/LoginMusician/LoginMusician'
import { Payment } from './Pages/Payment/Payment'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MusicianDescription } from './Pages/MusicianDescription/MusicianDescription'
import { CreateAccountMusician } from './Pages/CreateAccountMusician/CreateAccountMusician'
import { CreateAccountUser } from './Pages/CreateAccountUser/CreateAccountUser'
import { UserProfile } from './Pages/UserProfile/UserProfile'
import { EditProfileUser } from './Pages/EditProfileUser/EditProfileUser'
import { EditProfileMusician } from './Pages/EditProfileMusician/EditProfileMusician'
import { MusicianProfile } from './Pages/MusicianProfile/MusicianProfile'
import { Reservation } from './Pages/Reservation/Reservation'
import { SentReservation } from './Pages/SentReservation/SentReservation'
import { ReservationAccepted } from './Pages/ReservationAccepted/ReservationAccepted'
import { Congrats } from './Pages/Congrats/Congrats'
import { MusicianEvents } from './Pages/MusicianEvents/MusicianEvents'
import { LandingPage } from './Pages/LandingPage/LandingPage'
import { Login } from './Pages/Login/Login'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/login/client" element={<Login />} />
                <Route path="/login/musican" element={<LoginMusician />} />
                <Route
                    path="/crearcuenta/cliente"
                    element={<CreateAccountUser />}
                />
                <Route
                    path="/crearcuenta/musican"
                    element={<CreateAccountMusician />}
                />
                <Route path="/login" element={<InicioSesion />} />
                <Route
                    path="/crearcuenta/payment/execute-payment/:id"
                    element={<Payment />}
                />
                <Route
                    path="/musician/description/:id"
                    element={<MusicianDescription />}
                />
                <Route path="/crearcuenta" element={<CreateAccount />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/editprofileuser" element={<EditProfileUser />} />
                <Route
                    path="/editprofilemusician"
                    element={<EditProfileMusician />}
                />
                <Route path="/profilemusician" element={<MusicianProfile />} />
                <Route path="/reservation/:id" element={<Reservation />} />
                <Route path="/sentreservation" element={<SentReservation />} />
                <Route
                    path="/reservationaccepted"
                    element={<ReservationAccepted />}
                />
                <Route path="/congrats" element={<Congrats />} />
                <Route path="/musician/events" element={<MusicianEvents />} />
            </Routes>
        </div>
    )
}
export default App

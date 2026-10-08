import React from 'react'
import './EditProfileMusician.scss'
import { AppContext } from '../../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavbarOp2 } from '../../Components/Navbar/NavbarOp2'
import { useState } from 'react'
import Uppy from '@uppy/core'
import Transloadit from '@uppy/transloadit'
import Alert from 'react-bootstrap/Alert'
import { StatesSelect } from '../../Components/StatesSelect/StatesSelect'
import { MunicipalitySelect } from '../../Components/MunicipalitySelect/MunicipalitySelect'

export const EditProfileMusician = () => {
    const Context = React.useContext(AppContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('musicAppToken')
    const [user, setUser] = React.useState(null)
    const [Loading, setLoading] = React.useState(true)
    const [uppy, setUppy] = useState()
    const [isUploadingFile, setIsUploadingFile] = useState(false)
    const [estado, setEstado] = React.useState(null)
    const [imgeUpload, setImgeUpload] = useState(null)
    const [show, setShow] = React.useState(false)

    const onCompleteUploadFiles = (assembly) => {
        // aqui pueden tomar la url de la imagen para ponerla en un estado y mandarla al API
        const image = assembly.results?.compress_image[0].ssl_url
        setImgeUpload({ image: image })
        setIsUploadingFile(false)
    }
    const onFileInputChange = (event) => {
        setIsUploadingFile(true)
        const file = Array.from(event.target.files)[0] || null
        if (file) {
            uppy.reset()
            uppy.addFile({
                name: file.name,
                type: file.type,
                data: file,
            })
            uppy.upload()
        }
    }
    React.useEffect(() => {
        axios
            .get(`${Context.api.apiUrl}/musician`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                    token: token,
                },
            })
            .then((res) => {
                setUser(res.data.payload[0])

                setLoading(false)
            })
        const uppyInstance = new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
            },
        })
            .use(Transloadit, {
                params: {
                    auth: {
                        key: process.env
                            .REACT_APP_NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY,
                    },
                    template_id:
                        process.env
                            .REACT_APP_NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
                },
                waitForEncoding: true,
            })
            .on('transloadit:complete', onCompleteUploadFiles)
        setUppy(uppyInstance)
    }, [Context.api.apiUrl, token])
    const handleSave = (e) => {
        e.preventDefault()
        if (user.password) {
            axios.patch(
                `${Context.api.apiUrl}/musician/password`,
                {
                    password: user.password,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            )
        }
        axios
            .patch(
                `${Context.api.apiUrl}/musician`,
                {
                    name: user.name,
                    secondlastname: user.lastname,
                    lastname: user.secondlastname,
                    estado: estado === null ? user.state : estado.estado,
                    imagenMusico:
                        imgeUpload === null
                            ? user.imagenMusico
                            : imgeUpload.image,
                    nombreArtistico: user.nombreArtistico,
                    horarioDiaUno: user.horarioDiaUno,
                    horarioDiaDos: user.horarioDiaDos,
                    horarioInicio: user.horarioInicio,
                    horarioFin: user.horarioFin,
                    descripcion: user.descripcion,
                    municipio:
                        estado === null ? user.municipio : estado.municipality,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then((res) => {
                if (res.data.success === true) {
                    setShow(true)
                    setTimeout(() => {
                        navigate('/userprofile')
                    }, 1500)
                    //
                } else {
                    alert('Error')
                    navigate('/userprofile')
                }
            })
    }

    return (
        <div classname="editarperfilmusicoContent">
            <NavbarOp2 />

            {Loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <section>
                    <Alert show={show} variant="success">
                        <Alert.Heading className="d-flex justify-content-center">
                            Datos actualizados
                        </Alert.Heading>
                    </Alert>

                    <div className="EditProfileUser">
                        <div className="EditProfileUser-container">
                            <p className="Login-Title">
                                EDITAR MI PERFIL MÚSICO
                            </p>
                            <div className="EditProfileUser-content">
                                <div className="EditProfileUserFormulario">
                                    <form className="EditProfileUserForm">
                                        <p className="NombreApp1">TumusAh</p>
                                        <label className="labelCreateUse">
                                            Nombre
                                        </label>
                                        <input
                                            value={user.name}
                                            type="text"
                                            className="editUser"
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    name: target.value,
                                                })
                                            }}
                                        />

                                        <label className="labelCreateUse">
                                            Apellido paterno
                                        </label>
                                        <input
                                            value={user.lastname}
                                            type="text"
                                            className="editUser"
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    lastname: target.value,
                                                })
                                            }}
                                        />

                                        <label className="labelCreateUse">
                                            Apellido materno
                                        </label>
                                        <input
                                            value={user.secondlastname}
                                            type="text"
                                            className="editUser"
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    secondlastname:
                                                        target.value,
                                                })
                                            }}
                                        />

                                        <label className="labelCreateUse">
                                            Escribe una contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="editUser"
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    password: target.value,
                                                })
                                            }}
                                        />

                                        <label className="labelCreateUse">
                                            Nombre artistico
                                        </label>
                                        <input
                                            value={user.nombreArtistico}
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    nombreArtistico:
                                                        target.value,
                                                })
                                            }}
                                            type="text"
                                            className="editUser"
                                        />

                                        <label className="labelCreateUse">
                                            Estado
                                        </label>

                                        <div className="estados">
                                            {' '}
                                            <StatesSelect
                                                setEstado={setEstado}
                                            />
                                        </div>
                                        {estado == null ? (
                                            <></>
                                        ) : (
                                            <div className="estados">
                                                {' '}
                                                <MunicipalitySelect
                                                    setEstado={setEstado}
                                                    estado={estado}
                                                />
                                            </div>
                                        )}

                                        <div className="disponibilidad">
                                            <div className="diasdisponibles">
                                                <p className="labelhours">
                                                    Dias disponibles para
                                                    servicio
                                                </p>
                                                <label className="labelDates">
                                                    De
                                                </label>
                                                <select
                                                    className="Tipoartista"
                                                    id="Tipoartista"
                                                    onChange={({ target }) => {
                                                        setUser({
                                                            ...user,
                                                            horarioDiaUno:
                                                                target.value,
                                                        })
                                                    }}
                                                >
                                                    <option value="Lunes">
                                                        Lunes
                                                    </option>
                                                    <option value="Martes">
                                                        Martes
                                                    </option>
                                                    <option value="Miércoles">
                                                        Miércoles
                                                    </option>
                                                    <option value="Jueves">
                                                        Jueves
                                                    </option>
                                                    <option value="Viernes">
                                                        Viernes
                                                    </option>
                                                    <option value="Sábado">
                                                        Sábado
                                                    </option>
                                                    <option value="Domingo">
                                                        Domingo
                                                    </option>
                                                </select>
                                                <label className="labelDates">
                                                    {' '}
                                                    a{' '}
                                                </label>
                                                <select
                                                    className="Tipoartista"
                                                    id="Tipoartista"
                                                    onChange={({ target }) => {
                                                        setUser({
                                                            ...user,
                                                            horarioDiaDos:
                                                                target.value,
                                                        })
                                                    }}
                                                >
                                                    <option value="Lunes">
                                                        Lunes
                                                    </option>
                                                    <option value="Martes">
                                                        Martes
                                                    </option>
                                                    <option value="Miércoles">
                                                        Miércoles
                                                    </option>
                                                    <option value="Jueves">
                                                        Jueves
                                                    </option>
                                                    <option value="Viernes">
                                                        Viernes
                                                    </option>
                                                    <option value="Sábado">
                                                        Sábado
                                                    </option>
                                                    <option value="Domingo">
                                                        Domingo
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="diasdisponibles">
                                                <p className="labelhours">
                                                    Horas disponibles para
                                                    servicio
                                                </p>
                                                <label className="labelDates">
                                                    De
                                                </label>
                                                <select
                                                    className="Tipoartista"
                                                    id="Tipoartista"
                                                    onChange={({ target }) => {
                                                        setUser({
                                                            ...user,
                                                            horarioInicio:
                                                                target.value,
                                                        })
                                                    }}
                                                >
                                                    <option value="12:00 am">
                                                        12:00 am
                                                    </option>
                                                    <option value="1:00 am">
                                                        1:00 am
                                                    </option>
                                                    <option value="2:00 am">
                                                        2:00 am
                                                    </option>
                                                    <option value="3:00 am">
                                                        3:00 am
                                                    </option>
                                                    <option value="4:00 am">
                                                        4:00 am
                                                    </option>
                                                    <option value="5:00 am">
                                                        5:00 am
                                                    </option>
                                                    <option value="6:00 am">
                                                        6:00 am
                                                    </option>
                                                    <option value="7:00 am">
                                                        7:00 am
                                                    </option>
                                                    <option value="8:00 am">
                                                        9:00 am
                                                    </option>
                                                    <option value="10:00 am">
                                                        10:00 am
                                                    </option>
                                                    <option value="11:00 am">
                                                        11:00 am
                                                    </option>
                                                    <option value="12:00 am">
                                                        12:00 am
                                                    </option>
                                                    <option value="1:00 pm">
                                                        1:00 pm
                                                    </option>
                                                    <option value="2:00 pm">
                                                        1:00 pm
                                                    </option>
                                                    <option value="3:00 pm">
                                                        3:00 pm
                                                    </option>
                                                    <option value="4:00 pm">
                                                        4:00 pm
                                                    </option>
                                                    <option value="5:00 pm">
                                                        5:00 pm
                                                    </option>
                                                    <option value="6:00 pm">
                                                        6:00 pm
                                                    </option>
                                                    <option value="7:00 pm">
                                                        7:00 pm
                                                    </option>
                                                    <option value="8:00 pm">
                                                        8:00 pm
                                                    </option>
                                                    <option value="9:00 pm">
                                                        9:00 pm
                                                    </option>
                                                    <option value="10:00 pm">
                                                        10:00 pm
                                                    </option>
                                                    <option value="11:00 pm">
                                                        11:00 pm
                                                    </option>
                                                    <option value="12:00 pm">
                                                        12:00 pm
                                                    </option>
                                                </select>
                                                <label className="labelDates">
                                                    {' '}
                                                    a{' '}
                                                </label>
                                                <select
                                                    className="Tipoartista"
                                                    id="Tipoartista"
                                                    onChange={({ target }) => {
                                                        setUser({
                                                            ...user,
                                                            horarioFin:
                                                                target.value,
                                                        })
                                                    }}
                                                >
                                                    <option value="12:00 am">
                                                        12:00 am
                                                    </option>
                                                    <option value="1:00 am">
                                                        1:00 am
                                                    </option>
                                                    <option value="2:00 am">
                                                        2:00 am
                                                    </option>
                                                    <option value="3:00 am">
                                                        3:00 am
                                                    </option>
                                                    <option value="4:00 am">
                                                        4:00 am
                                                    </option>
                                                    <option value="5:00 am">
                                                        5:00 am
                                                    </option>
                                                    <option value="6:00 am">
                                                        6:00 am
                                                    </option>
                                                    <option value="7:00 am">
                                                        7:00 am
                                                    </option>
                                                    <option value="8:00 am">
                                                        9:00 am
                                                    </option>
                                                    <option value="10:00 am">
                                                        10:00 am
                                                    </option>
                                                    <option value="11:00 am">
                                                        11:00 am
                                                    </option>
                                                    <option value="12:00 am">
                                                        12:00 am
                                                    </option>
                                                    <option value="1:00 pm">
                                                        1:00 pm
                                                    </option>
                                                    <option value="2:00 pm">
                                                        1:00 pm
                                                    </option>
                                                    <option value="3:00 pm">
                                                        3:00 pm
                                                    </option>
                                                    <option value="4:00 pm">
                                                        4:00 pm
                                                    </option>
                                                    <option value="5:00 pm">
                                                        5:00 pm
                                                    </option>
                                                    <option value="6:00 pm">
                                                        6:00 pm
                                                    </option>
                                                    <option value="7:00 pm">
                                                        7:00 pm
                                                    </option>
                                                    <option value="8:00 pm">
                                                        8:00 pm
                                                    </option>
                                                    <option value="9:00 pm">
                                                        9:00 pm
                                                    </option>
                                                    <option value="10:00 pm">
                                                        10:00 pm
                                                    </option>
                                                    <option value="11:00 pm">
                                                        11:00 pm
                                                    </option>
                                                    <option value="12:00 pm">
                                                        12:00 pm
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <label className="banddescription">
                                            Descripción de la agrupación o
                                            servicio
                                        </label>
                                        <textarea
                                            row="8"
                                            col="22"
                                            type="text"
                                            className="editUser4"
                                            value={user.descripcion}
                                            onChange={({ target }) => {
                                                setUser({
                                                    ...user,
                                                    descripcion: target.value,
                                                })
                                            }}
                                        >
                                            {' '}
                                        </textarea>
                                        <label className="banddescription">
                                            Cambia tu imagen de perfil
                                        </label>
                                        <div className="elegirArchivo">
                                            <input
                                                className="text-whites"
                                                type="file"
                                                name="file"
                                                id="file"
                                                onChange={onFileInputChange}
                                            />
                                            <div>
                                                {isUploadingFile ? (
                                                    <div
                                                        className="spinner-grow text-primary"
                                                        role="status"
                                                    >
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            className="BotonGeneral"
                                            onClick={handleSave}
                                        >
                                            GUARDAR CAMBIOS
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

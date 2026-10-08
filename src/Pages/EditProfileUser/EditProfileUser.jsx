import React from 'react'
import './EditProfileUser.scss'
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
import '@uppy/core/dist/style.css'
import '@uppy/file-input/dist/style.css'
export const EditProfileUser = () => {
    const Context = React.useContext(AppContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('musicAppToken')
    const [user, setUser] = React.useState(null)
    const [Loading, setLoading] = React.useState(true)
    const [uppy, setUppy] = useState()
    const [isUploadingFile, setIsUploadingFile] = useState(false)
    const [imgeUpload, setImgeUpload] = useState(null)
    const [show, setShow] = React.useState(false)
    const [estado, setEstado] = React.useState(null)

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
            .get(`${Context.api.apiUrl}/clients`, {
                headers: {
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
                `${Context.api.apiUrl}/clients/password`,
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
            .put(
                `${Context.api.apiUrl}/clients`,
                {
                    name: user.name,
                    secondlastname: user.lastname,
                    lastname: user.secondlastname,
                    state: user.state,
                    imagenusuario:
                        imgeUpload === null
                            ? user.imagenusuario
                            : imgeUpload.image,
                    estado: estado === null ? user.state : estado.estado,
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
                if (res.data.success) {
                    setShow(true)
                    setTimeout(() => {
                        navigate('/userprofile')
                    }, 1500)
                } else {
                    alert('Error')
                }
            })
    }

    //
    return (
        <div>
            <NavbarOp2 />
            <Alert show={show} variant="success">
                <Alert.Heading>Datos actualizados!</Alert.Heading>
            </Alert>
            {Loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="EditProfileUser">
                    <div className="EditProfileUser-container">
                        <p className="Login-Title">EDITAR MI PERFIL</p>
                        <div className="EditProfileUser-content">
                            <div className="EditProfileUserFormulario">
                                <form className="EditProfileUserForm">
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
                                                secondlastname: target.value,
                                            })
                                        }}
                                    />

                                    <label className="labelCreateUse">
                                        Estado
                                    </label>
                                    <div className="state">
                                        <StatesSelect setEstado={setEstado} />
                                    </div>
                                    {estado == null ? (
                                        <></>
                                    ) : (
                                        <div className="state">
                                            {' '}
                                            <MunicipalitySelect
                                                setEstado={setEstado}
                                                estado={estado}
                                            />
                                        </div>
                                    )}

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
            )}
        </div>
    )
}

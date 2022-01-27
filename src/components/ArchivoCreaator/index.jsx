import './ArchivoCreator.css'
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGancho } from '../../context/GanchoContext';
import getDate from '../../services/getDate';
import useUploadFirebase from '../../hooks/useUploadFirebase';
import { useColections } from '../../hooks/useColections';

const ArchivoCreator = ({ open, setOpen, colectionName = '' }) => {

    const { currentUser } = useAuth()
    const { gancho, changeGancho } = useGancho()
    const keyword = colectionName
    const { colections } = useColections({ keyword })

    // const [archivosUser, setArchivosUser] = useState([])

    const FORM_STATE = {
        titulo: '',
        colection: '',
        postContent: '',
        fechaCreado: '',
        usuario: ''
    }

    const [formData, setFormData] = useState(FORM_STATE)

    useEffect(() => {
        setFormData({
            ...formData,
            fechaCreado: getDate(),
            usuario: currentUser.uid
        })
    }, [currentUser.uid])

    const crearArchivoButton = () => {
        setOpen(!open)
        changeGancho(!gancho)
    }

    const handleOnChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const closeArchivoCreator = () => {
        setOpen(!open)
    }
    const HandleUpload = (e) => {
        e.preventDefault()
        useUploadFirebase({ formData: formData })
    }

    return (
        <div className={`archivoCreator ${open ? 'open' : 'close'}`}>
            <div className='archivoCreatorContainer'>
                <span
                    onClick={closeArchivoCreator}
                >X</span>
                <h3>
                    Crea un post
                </h3>
                <form
                    id="form-checkout-archivo"
                    className='form-checkout-archivo'
                    onSubmit={HandleUpload}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='titulo' placeholder='Título' value={formData.titulo} />
                    <label htmlFor="colection">Selecciona una colección para el post</label>
                    <select required value={formData.colection} name="colection" placeholder='hola'>
                        {
                            colections.length !== 0 ?
                            colections.filter(colection => colection.userId === currentUser.uid).map(item => (
                                    <>
                                        {
                                            item ?
                                                <option key={item.id} value={item.id}>{item.document.nombre}</option>
                                                :
                                                <p>no hay colecciones</p>
                                        }
                                    </>
                                ))
                                :
                                <p>no hay colecciones</p>
                        }
                    </select>
                    <textarea name="postContent" placeholder='Post' value={formData.postContent}></textarea>
                    <button
                        onClick={crearArchivoButton}
                    >Crear post</button>
                </form>
            </div>
        </div>
    );
}

export default ArchivoCreator;
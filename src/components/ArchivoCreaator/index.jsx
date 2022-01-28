import './ArchivoCreator.css'
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useGancho } from '../../context/GanchoContext'
import getDate from '../../services/getDate'
import useUploadFirebase from '../../hooks/useUploadFirebase'
import { useColections } from '../../hooks/useColections'

const ArchivoCreator = ({ open, setOpen, colectionName = '' }) => {

    const { currentUser } = useAuth()
    const { gancho, changeGancho } = useGancho()
    const keyword = colectionName
    const { colections } = useColections({ keyword })

    const FORM_STATE = {
        titulo: '',
        colection: '',
        postContent: '',
        fechaCreado: '',
        usuario: ''
    }

    const FIRST_COLECTION = colections.filter(colection => colection.usuario === currentUser.uid)

    const [formData, setFormData] = useState(FORM_STATE)

    useEffect(() => {
        setFormData({
            ...formData,
            colection: FIRST_COLECTION[0] ? FIRST_COLECTION[0].id : '',
            fechaCreado: getDate(),
            usuario: currentUser.uid
        })
    }, [currentUser.uid, colections])

    const closeArchivoCreator = () => {
        setOpen(!open)
    }

    const handleOnChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const HandleUpload = (e) => {
        e.preventDefault()
        setOpen(!open)
        changeGancho(!gancho)
        useUploadFirebase({ formData: formData, colection: 'posts' })
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
                    <select required value={formData.colection} name="colection">
                        {
                            colections.length !== 0 
                            ? colections.filter(colection => colection.usuario === currentUser.uid).map(item => 
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                )
                            : <p>no hay colecciones</p>
                            
                        }
                    </select>
                    <textarea name="postContent" placeholder='Post' value={formData.postContent}></textarea>
                    <button>Crear post</button>
                </form>
            </div>
        </div>
    );
}

export default ArchivoCreator;
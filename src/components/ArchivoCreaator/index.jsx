import './ArchivoCreator.css'
import { useAuth } from "../../context/AuthContext";
import { useGancho } from '../../context/GanchoContext';
import { getFirestore } from "../../firebase";
import { useState, useEffect } from "react";
import firebase from 'firebase/compat';

const ArchivoCreator = ({ open, setOpen }) => {

    const { currentUser } = useAuth()
    const { gancho, changeGancho } = useGancho()

    const [archivosUser, setArchivosUser] = useState([])
    const [pintar, setPintar] = useState([])

    const [formData, setFormData] = useState({
        titulo: '',
        colection: ''
    })

    const closeArchivoCreator = () => {
        setOpen(!open)
    }

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const subirArchivo = (e) => {

        e.preventDefault()

        let archivo = {};
        const date = new Date()
        const dia = date.getDate()
        const mes = date.getMonth()
        const year = date.getFullYear()

        let mesCorrecto = mes > 9 ? mes + 1 : `0${mes + 1}`

        let fecha_creado = dia + '/' + mesCorrecto + '/' + year

        archivo.userId = currentUser.uid
        archivo.titulo = formData.titulo
        archivo.colection = formData.colection
        archivo.postContent = formData.postContent
        archivo.fechaCreado = fecha_creado

        const db = getFirestore();
        db.collection('posts').add(archivo)
            .then((res) => console.log(res))
            .catch(err => console.log(err))

        // setGancho(!gancho)
    }


    const crearArchivoButton = () => {
        setOpen(!open)
        changeGancho(!gancho)
    }


    useEffect(() => {
        const dbQuery = getFirestore()
        const traer = dbQuery.collection('colecciones')

        traer.get().then(({ docs }) => {
            setArchivosUser(docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

    }, [gancho])

    useEffect(() => {

        setPintar(
            archivosUser
                .filter(item => currentUser.uid === item.userId)
                .map(doc => ({
                    id: doc.id, userId: doc.userId, nombre: doc.document.nombre
                }))
        )

    }, [archivosUser])

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
                    onSubmit={subirArchivo}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='titulo' placeholder='Título' value={formData.titulo} />
                    <label htmlFor="colection">Selecciona una colección para el post</label>
                    <select required value={formData.colection} name="colection" placeholder='hola'>
                        {
                            pintar.length !== 0 ?
                                pintar.map(item => (
                                    <>
                                        {
                                            item ?
                                                <option value={item.id}>{item.nombre}</option>
                                                :
                                                <p>no hay colecciones</p>
                                        }
                                    </>
                                ))
                                :
                                <p>no hay colecciones</p>
                        }
                    </select>
                    <textarea name="postContent" placeholder='Post'></textarea>
                    <button
                        onClick={crearArchivoButton}
                    >Crear post</button>
                </form>
            </div>
        </div>
    );
}

export default ArchivoCreator;
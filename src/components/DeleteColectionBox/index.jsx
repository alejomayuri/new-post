import './DeleteColectionBox.css'
import { useColection } from "../../context/ColectionSelect"
import { useColections } from '../../hooks/useColections'
import { getFirestore } from "../../firebase"
import { useState } from 'react'
import { useGancho } from '../../context/GanchoContext'
import { useAuth } from '../../context/AuthContext'

export default function DeleteColectionBox({ open, close, postsToDelete }) {

    const { currentColection, changeColection } = useColection()
    const { currentUser } = useAuth()
    const [deleteState, setDeleteState] = useState(false)
    const [deleteMensaje, setDeleteMensaje] = useState(false)
    const { gancho, changeGancho } = useGancho()
    const { colections } = useColections('colecciones')

    const deleteColection = () => {
        const db = getFirestore()
        db.collection('colecciones').doc(currentColection.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setDeleteState(true)
            setDeleteMensaje(true)
            changeGancho(!gancho)
            changeColection(colections.filter(coleccion => coleccion.usuario === currentUser.uid)[0])
        }).catch((error) => {
            setDeleteState(true)
            setDeleteMensaje(false)
            console.error("Error removing document: ", error);
        });

        for (let index = 0; index < postsToDelete.length; index++) {
            db.collection('posts').doc(postsToDelete[index].id).delete().then(() => {
                console.log(`Document ${postsToDelete[index].id} successfully deleted!`);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    const handleDeleteClose = () => {
        close(false)
        setDeleteState(false)
    }

    return (
        <div className={`borrarColectionBox ${open ? 'opneDeletecolectionBox' : 'closeDeletecolectionBox'}`}>
            {
                !deleteState
                    ? <>
                        <p>Seguro que quieres borrar la coleccion <b>{currentColection.nombre}</b>?</p>
                        <p>Los posts dentro de la colección se perderán</p>
                        <div className='borrarColectionButtonBox'>
                            <button onClick={deleteColection}>Borrar</button>
                            <button onClick={() => close(false)}>Cancelar</button>
                        </div>
                    </>
                    : deleteMensaje
                        ? <>
                            <p>La colección <b>{currentColection.nombre}</b> y sus post se borraron correctamente</p>
                            <div className='borrarColectionButtonBox'>
                                <button onClick={handleDeleteClose}>Cerrar</button>
                            </div>
                        </>
                        : <>
                            <p>Ha ocurrido un error, intente después</p>
                            <div className='borrarColectionButtonBox'>
                                <button onClick={handleDeleteClose}>Cerrar</button>
                            </div>
                        </>
            }
        </div>
    )
}

import './EditColectionBox.css'
import { useColection } from "../../context/ColectionSelect"
import { getFirestore } from "../../firebase"
import { useState } from 'react'
import { useGancho } from '../../context/GanchoContext'

export default function EditColectionBox({ open, close }) {

    const { currentColection } = useColection()

    const [newName, setNewName] = useState({})
    const [editState, setEditState] = useState(false)
    const [editMensaje, setEditMensaje] = useState(false)

    const { gancho, changeGancho } = useGancho()

    const handleOnChange = (e) => setNewName({
        ...newName,
        [e.target.name]: e.target.value
    })

    const updateColection = (event) => {
        event.preventDefault()

        const db = getFirestore()
        db.collection('colecciones').doc(currentColection.id).update({
            nombre: newName.nombre
        })
            .then(() => {
                console.log("Document successfully updated!");
                setEditState(true)
                setEditMensaje(true)
                changeGancho(!gancho)
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    const handleEditClose = () => {
        close(false)
        setEditState(false)
    }

    return (
        <div className={`editarColectionBox ${open ? 'opneEditColectionBox' : 'closeEditColectionBox'}`}>

            {
                !editState
                    ? <>
                        <p>Cambia el nombre de la colección <b>{currentColection.nombre}</b></p>
                        <form
                            className=''
                            onSubmit={updateColection}
                            onChange={handleOnChange}
                        >
                            <input required type="text" name='nombre' placeholder={currentColection.nombre} value={newName.nombre} />
                            <button>Actualizar</button>
                        </form>
                        <button onClick={() => close(false)}>Cancelar</button>
                    </>
                    : editMensaje
                        ? <>
                            <p>El nombre de la colección se cambió correctamente</p>
                            <button onClick={handleEditClose}>Cerrar</button>
                        </>
                        : <>
                            <p>Ha ocurrido un error, intente después</p>
                            <div className='borrarColectionButtonBox'>
                                <button onClick={handleEditClose}>Cerrar</button>
                            </div>
                        </>
            }
        </div>
    )
}
import './EditColectionBox.css'
import { useColection } from "../../context/ColectionSelect"
import { getFirestore } from "../../firebase"
import { useState } from 'react'

export default function EditColectionBox({ open, close }) {

    const { currentColection } = useColection()

    const [newName, setNewName] = useState({})

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
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    console.log(newName)

    return (
        <div className={`editarColectionBox ${open ? 'opneEditColectionBox' : 'closeEditColectionBox'}`}>
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
        </div>
    )
}
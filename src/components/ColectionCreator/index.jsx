import './ColectionCreator.css'
import { useAuth } from "../../context/AuthContext";
import { useGancho } from '../../context/GanchoContext';
import { getFirestore } from "../../firebase";
import { useState } from "react";

const ColectionCreator = ({ open, setOpen }) => {

    const { currentUser } = useAuth()
    const { gancho, changeGancho } = useGancho()

    const [formData, setFormData] = useState({
        nombre: '',
    })

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const subirColeccion = (e) => {

        e.preventDefault()

        let archivo = {};

        archivo.userId = currentUser.uid
        archivo.document = formData

        const db = getFirestore();
        db.collection('colecciones').add(archivo)
            .then((res) => console.log(res))
            .catch(err => console.log(err))

        // setGancho(!gancho)
    }

    const closeColectionCreator = () => {
        setOpen(!open)
    }

    const crearColectionButton = () => {
        setOpen(!open)
        changeGancho(!gancho)
    }

    return (
        <div className={`colectionCreator ${open ? 'open' : 'close'}`}>
            <div className='colectionCreatorContainer'>
                <span
                    onClick={closeColectionCreator}
                >X</span>
                <h3>
                    Ponle un nombre a tu colección
                </h3>
                <form 
                    id="form-checkout" 
                    className='form-checkout'
                    onSubmit={subirColeccion}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='nombre' placeholder='Nombre' value={formData.nombre} />
                    <button
                        onClick={crearColectionButton}
                    >Crear colección</button>
                </form>
            </div>
        </div>
    );
}

export default ColectionCreator;
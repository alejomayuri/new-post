import './ColectionCreator.css'
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGancho } from '../../context/GanchoContext';
import useUploadFirebase from '../../hooks/useUploadFirebase';


const ColectionCreator = ({ open, setOpen }) => {

    const { currentUser } = useAuth()
    const { gancho, changeGancho } = useGancho()

    const FORM_STATE = {
        nombre: '',
        usuario: ''
    }

    const [formData, setFormData] = useState(FORM_STATE)

    useEffect(() => {
        setFormData({
            ...formData,
            usuario: currentUser.uid
        })
    }, [currentUser.uid])

    const closeColectionCreator = () => {
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
        useUploadFirebase({ formData: formData, colection: 'colecciones' })
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
                    onSubmit={HandleUpload}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='nombre' placeholder='Nombre' value={formData.nombre} />
                    <button>Crear colección</button>
                </form>
            </div>
        </div>
    );
}

export default ColectionCreator;
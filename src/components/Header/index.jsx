import './Header.css'
import { useAuth } from "../../context/AuthContext";
import logo from '../Inicio/img/logo.png'
import { useState } from 'react/cjs/react.development';
import ColectionCreator from '../ColectionCreator';
import ArchivoCreator from '../ArchivoCreaator';

const Header = () => {

    const { currentUser } = useAuth()
    const [openColection, setOpenColection] = useState(false)
    const [openArchivo, setOpenArchivo] = useState(false)

    const openColectionCreator = () => {
        setOpenColection(!openColection)
    }

    const openArchivoCreator = () => {
        setOpenArchivo(!openArchivo)
    }

    return (
        <>
            <header>
                <img className='logo-header' src={logo} alt="logo" />
                <div>
                    <img src={currentUser.photoURL} alt="photoURL" />
                    <button
                        onClick={openColectionCreator}
                    >Colección</button>
                    <button
                        onClick={openArchivoCreator}
                    >Post</button>
                </div>
            </header>
            <ColectionCreator setOpen={setOpenColection} open={openColection} />
            <ArchivoCreator setOpen={setOpenArchivo} open={openArchivo} />
        </>
    );
}

export default Header;
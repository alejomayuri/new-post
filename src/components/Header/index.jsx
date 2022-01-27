import './Header.css'
import logo from '../../media/logo.png'
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react/cjs/react.development';
import ColectionCreator from '../ColectionCreator';
import ArchivoCreator from '../ArchivoCreaator';
import HeaderButton from '../HeaderButton';
import UserMenu from '../UserMenu';

const Header = () => {

    const { currentUser } = useAuth()
    const [openColectionCreator, setOpenColectionCreator] = useState(false)
    const [openArchivoCreator, setOpenArchivoCreator] = useState(false)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const handleUserMenu = () => setOpenUserMenu(!openUserMenu)

    return (
        <>
            <header>
                <img className='logo-header' src={logo} alt="logo" />
                <div className='menu'>
                    <img onClick={handleUserMenu} src={currentUser.photoURL} alt="photoURL" />
                    <HeaderButton setFunction={setOpenColectionCreator} value={'Colección'} />
                    <HeaderButton setFunction={setOpenArchivoCreator} value={'Post'} />

                    <UserMenu open={openUserMenu} />
                </div>
            </header>
            <ColectionCreator setOpen={setOpenColectionCreator} open={openColectionCreator} />
            <ArchivoCreator colectionName={'colecciones'} setOpen={setOpenArchivoCreator} open={openArchivoCreator} />
        </>
    );
}

export default Header;
import './Header.css'
import logo from '../../media/logo.png'
import { useState } from 'react/cjs/react.development';
import ColectionCreator from '../ColectionCreator';
import ArchivoCreator from '../ArchivoCreaator';
import HeaderButton from '../HeaderButton';
import UserMenu from '../UserMenu';
import ProfilePic from '../ProfilePic';

const Header = () => {

    const [openColectionCreator, setOpenColectionCreator] = useState(false)
    const [openArchivoCreator, setOpenArchivoCreator] = useState(false)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    return (
        <>
            <header>
                <img className='logo-header' src={logo} alt="logo" />
                <div className='menu'>
                    <ProfilePic isOpen={openUserMenu} setFunction={setOpenUserMenu} />
                    <HeaderButton disabled={openArchivoCreator} isOpen={openColectionCreator} setFunction={setOpenColectionCreator} value={'Colección'} />
                    <HeaderButton disabled={openColectionCreator} isOpen={openArchivoCreator} setFunction={setOpenArchivoCreator} value={'Post'} />

                    <UserMenu open={openUserMenu} />
                </div>
            </header>
            <ColectionCreator setOpen={setOpenColectionCreator} open={openColectionCreator} />
            <ArchivoCreator colectionName={'colecciones'} setOpen={setOpenArchivoCreator} open={openArchivoCreator} />
        </>
    );
}

export default Header;
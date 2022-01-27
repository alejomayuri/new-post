import './UserMenu.css'
import { useAuth } from '../../context/AuthContext';

export default function UserMenu({open}) {
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err)
        }
    }

    return (<>
        <div className={`userMenu ${open ? 'open' : 'close'}`}>
            <ul>
                <li onClick={handleLogout} >Cerrar sesión</li>
            </ul>
        </div>
    </>
    )
}
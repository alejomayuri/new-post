import './Inicio.css'
import Login from "../Login";
import SingUp from "../SingUp";
import logo from './img/logo.png'

const Inicio = () => {

    return (
        <div className='inicio'>
            <div className="inicio-container">
                <div className='inicio-action'>
                    <img className='logo' src={logo} alt="logo" />
                    <p>LO IMPORTANTE</p>
                    <p>TENLO A LA MANO</p>
                    <Login />
                    <SingUp />
                </div>
            </div>
        </div>
    );
}

export default Inicio;
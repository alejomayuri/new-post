import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SingUp = () => {

    const [error, setError] = useState(null)

    const { singup } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('las contraseñas son distintas')
        } else {
            try {
                await singup(email, password)
                history.push('/')
            } catch(error) {
                setError('Error del servidor')
            }
        }
    }

    return (
        <div className='singup-container'>
            <div>
                {error && <p className='error'>{ error }</p>}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={handleEmail}  />
                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" name='contraseña' onChange={handlePassword} />
                    <label htmlFor="confirmar-contraseña">Confirmar contraseña</label>
                    <input type="password" name='confirmar-contraseña' onChange={handleConfirmPassword} />
                    <input className='singup-btn' type="submit" value='Registrarse' />
                </form>
            </div>
        </div>
    );
}

export default SingUp;
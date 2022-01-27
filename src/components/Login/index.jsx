import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const [error, setError] = useState(null)
    const { login } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmith = async(e) => {
        e.preventDefault();
        try {
            await login(email, password)
            history.push('/')
        } catch(error) {
            setError('Error en accesos')
        }
    }

    const onSubmit = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            history.push('/')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return (
        <div className='login-container'>
            <div>
                {error && <p className='error'>{ error }</p>}
            </div>
            <div>
                <form onSubmit={handleSubmith}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={handleEmail} />
                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" name='contraseña' onChange={handlePassword} />
                    <input className='submit-btn' type="submit" value='Iniciar sesión' />
                </form>
                <button
                    className='inicio-google'
                    onClick={onSubmit}
                >
                    Google
                </button>
            </div>
        </div>
    );
}

export default Login;
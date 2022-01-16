import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

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
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            history.push('/')
            console.log('user')
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div className='login-container'>
            <div>
                {error && <p className='error'>{ error }</p>}
                {/* <h2>Inicia sesion</h2> */}
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
                {/* <p>No estás registrado? <Link to='/singup'>Regístrate</Link></p> */}
            </div>
        </div>
    );
}

export default Login;
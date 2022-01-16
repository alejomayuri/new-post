import './Home.css'
import Header from "../Header";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getFirestore, app } from "../../firebase";
// import firebase from "@firebase/app-compat";
import 'firebase/compat/firestore'
import PostColeccion from "../PostColeccion";
import PostContainer from "../PostContainer";

function Home() {

    const { currentUser, logout } = useAuth()

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        nombre: '',
    })
    const [subirImg, setSubirImg] = useState()
    const [archivosUser, setArchivosUser] = useState([])
    const [gancho, setGancho] = useState(false)

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            setError('Error del servidor')
        }
    }

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        })
    }

    const subirArchivos = (e) => {

        e.preventDefault()

        let archivo = {};

        archivo.userId = currentUser.uid
        archivo.document = formData


        const db = getFirestore();
        db.collection('colecciones').add(archivo)
            .then((res) => console.log(res))
            .catch(err => console.log(err))

        setGancho(!gancho)
    }

    useEffect(() => {
        const dbQuery = getFirestore()
        const traer = dbQuery.collection('archivos')

        traer.get().then(({docs}) => {
            setArchivosUser(docs.map(doc => ({id: doc.id, ...doc.data()})))
        })
    }, [gancho])

    const handleImgSubmit = (e) => {
        e.preventDefault()

        let archivo = {};

        archivo.userId = currentUser.uid
        archivo.documentURL = subirImg


        const db = getFirestore();
        db.collection('archivos').add(archivo)
            .then((res) => console.log(res))
            .catch(err => console.log(err))

        setGancho(!gancho)
    }

    const handleImg = async(e) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name)

        await fileRef.put(file)
        console.log('Upload file', file.name)

        const urlImg = await fileRef.getDownloadURL();
        console.log(urlImg)
        setSubirImg(urlImg)
    }
        
    
    console.log(gancho)
    return (
        <>
            <Header />
            <main>
                <PostColeccion user={currentUser.uid} />
                <PostContainer />
            </main>
            
            <div>
                {error && <p>{error}</p>}
            </div>
            <div>
                <h2>Bienvenido</h2>
                <p>{currentUser.email}</p>
                <form id="form-checkout" action=""
                    onSubmit={subirArchivos}
                    onChange={handleOnChange}
                >
                    <input required type="text" name='nombre' placeholder='Nombre' value={formData.nombre} />
                    <button>Subir archivos</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
                
                <form action="" onSubmit={handleImgSubmit}>
                    <input type="file" onChange={handleImg} />
                    <button>Subir imagen</button>
                </form>

                <div>
                    <h3>Mis archivos</h3>
                    {
                        archivosUser?
                        archivosUser.filter(item => currentUser.uid === item.userId).map(item => (
                            <>
                                {
                                    item.document?
                                    <p>{item.document.nombre}</p>
                                    :
                                    <br/>
                                }
                            
                            <img width='300px' src={item.documentURL} alt="" />   
                            </>
                            
                        ))
                        :
                        <p>no hay archivos</p>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;

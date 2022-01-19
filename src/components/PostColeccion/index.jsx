import './PostColeccion.css'
import { useAuth } from "../../context/AuthContext";
import { useColection } from '../../context/ColectionSelect';
import { useGancho } from '../../context/GanchoContext';
import { useState, useEffect } from "react";
import { getFirestore } from "../../firebase";

const PostColeccion = () => {

    const { currentUser } = useAuth()
    const { changeColection } = useColection()
    const { gancho } = useGancho()

    const [archivosUser, setArchivosUser] = useState([])
    const [pintar, setPintar] = useState([])

    useEffect(() => {
        const dbQuery = getFirestore()
        const traer = dbQuery.collection('colecciones')

        traer.get().then(({ docs }) => {
            setArchivosUser(docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

    }, [gancho])

    useEffect(() => {

        setPintar(
            archivosUser
                .filter(item => currentUser.uid === item.userId)
                .map(doc => ({
                    id: doc.id, userId: doc.userId, nombre: doc.document.nombre
                }))
        )

    }, [archivosUser])

    const alert = (a) => {
        changeColection(a)
        console.log(a)
        const elemento = document.getElementById(a.id);
        const elementoActivo = document.getElementsByClassName('colectionActivo')
        if(elementoActivo.length === 1) {
            elementoActivo[0].classList.remove('colectionActivo');
        }
        elemento.classList.add('colectionActivo');
    }

    

    return (
        <div className='postColection'>
            <h3>Colecciones</h3>
            {
                pintar.length !== 0 ?
                    pintar.map(item => (
                        <>
                            {
                                item ?
                                    <div 
                                        id={item.id}
                                        className='elementColection'
                                        onClick={() => alert(item)}
                                    >
                                        <p>{item.nombre}</p>
                                    </div>
                                    :
                                    <p>no hay archivos</p>
                            }
                        </>
                    ))
                    :
                    <p>no hay archivos</p>
            }
        </div>
    );
}

export default PostColeccion;
import './PostContainer.css'
import { useColection } from '../../context/ColectionSelect';
import { useGancho } from '../../context/GanchoContext';
import { useState, useEffect } from "react";
import { getFirestore } from "../../firebase";

const PostContainer = () => {

    const { currentColection } = useColection()
    const { gancho } = useGancho()

    const [postColection, setPostColection] = useState([])
    const [pintarPost, setPintarPost] = useState([])

    useEffect(() => {
        const dbQuery = getFirestore()
        const traer = dbQuery.collection('posts')

        traer.get().then(({ docs }) => {
            setPostColection(docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

    }, [gancho])

    useEffect(() => {
        saltoDeLinea()
        setPintarPost(
            postColection
                .filter(item => currentColection.id === item.colection)
                .map(doc => ({
                    id: doc.id, userId: doc.userId, content: doc.postContent, fecha: doc.fechaCreado, titulo: doc.titulo
                }))
        )
    }, [postColection, currentColection])

    const saltoDeLinea = () => {
        pintarPost.map(texto => {
            const textNuevo = texto.content.replace(/\n/g, `<br />`)
            const txt = document.getElementById(`txt-${texto.id}`)
            txt.innerHTML = textNuevo
        })
        // pintarPost.content = texto
        // const t = document.getElementById('paratexto')
        // t.innerHTML = texto
    }
    useEffect(() => {
        saltoDeLinea()
    })
    
    console.log(pintarPost)

    return (
        <div className='postContainer'>
            {
                pintarPost.length !== 0 ?
                pintarPost.map(item => (
                        <>
                            {
                                item ?
                                    <div>
                                        <h3>{item.titulo}</h3>
                                        <p id={`txt-${item.id}`}>{item.content}</p>
                                        <p>{item.fecha}</p>
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

export default PostContainer;
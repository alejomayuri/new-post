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

        setPintarPost(
            postColection
                .filter(item => currentColection.id === item.colection)
                .map(doc => ({
                    id: doc.id, userId: doc.userId, content: doc.postContent
                }))
        )

    }, [postColection, currentColection])

    return (
        <div className='postContainer'>
            {
                pintarPost.length !== 0 ?
                pintarPost.map(item => (
                        <>
                            {
                                item ?
                                    <div>
                                        <p>{item.content}</p>
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
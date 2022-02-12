import './PostElement.css'
import { useState } from "react"
import TitlePostElement from '../TitlePostElement'
import ContentPostElement from '../ContentPostElement'
import { useGancho } from '../../context/GanchoContext'
import { getFirestore } from '../../firebase'


export default function PostElement({ item }) {

    const [postTarget, setPostTarget] = useState({})
    const [openDeletePost, setOpenDeletePost] = useState(false)
    const [openDeletePostMenu, setOpenDeletePostMenu] = useState(false)

    const { gancho, changeGancho } = useGancho()

    const handlePostTarget = (event) => setPostTarget(event.target)

    const handleOpenDeletePost = () => setOpenDeletePost(true)

    const handleCloseDeletePost = () => setOpenDeletePost(false)

    const handleOpenDeletePostMenu = () => setOpenDeletePostMenu(true)

    const handleCloseDeletePostMenu = () => setOpenDeletePostMenu(false)

    const deleteColection = () => {
        const db = getFirestore()
        db.collection('posts').doc(item.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setOpenDeletePostMenu(false)
            changeGancho(!gancho)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div className='postElementContainer'
            onClick={handlePostTarget}
            onMouseEnter={handleOpenDeletePost}
            onMouseLeave={handleCloseDeletePost}
        >
            {
                openDeletePostMenu
                    ? <div className='eliminarPostMenu'>
                        <p>¿Seguro que quieres eliminar este post?</p>
                        <div>
                            <button onClick={deleteColection}>Eliminar</button>
                            <button onClick={handleCloseDeletePostMenu}>Cancelar</button>
                        </div>
                    </div>
                    : <>
                        <div className='postElemenHeader'>
                            <TitlePostElement item={item} target={postTarget} />
                            <span onClick={handleOpenDeletePostMenu} className={`${openDeletePost ? 'openDelete' : ''}`}>X</span>
                        </div>


                        <ContentPostElement item={item} target={postTarget} />

                        <p className='fecha-container'>{`Creado el ${item.fechaCreado}`}</p>
                    </>
            }
        </div>
    )
}
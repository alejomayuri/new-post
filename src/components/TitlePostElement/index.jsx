import './TitlePostElement.css'
import { useState, useEffect, useRef } from "react"
import editIcon from '../../media/editar.png'
import { getFirestore } from '../../firebase'
import { useGancho } from '../../context/GanchoContext'

export default function TitlePostElement({ item, target }) {
    const [editButtonActive, setEditButtonActive] = useState(false)
    const [activeEditTitle, setActiveEditTitle] = useState(true)
    const [newName, setNewName] = useState({
        titulo: item.titulo
    })

    const { gancho, changeGancho } = useGancho()

    const handleOpenEditTitleMenu = () => setEditButtonActive(true)

    const handleCloseEditTitleMenu = () => setEditButtonActive(false)

    const handleActiveEditTitle = () => setActiveEditTitle(false)

    const RefDiv = useRef()

    const handleOnChange = (e) => setNewName({
        ...newName,
        [e.target.name]: e.target.value
    })

    const updatePostName = (event) => {
        event.preventDefault()
        setActiveEditTitle(true)
        setEditButtonActive(false)
        const db = getFirestore()
        db.collection('posts').doc(item.id).update({
            titulo: newName.titulo
        })
            .then(() => {
                console.log("Document successfully updated!");
                changeGancho(!gancho)
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    useEffect(() => {
        if (target.className === 'postElementContainer' || target.className === 'fecha-container' || target.className === 'text-container' && activeEditTitle === false) {
            setActiveEditTitle(true)
            setEditButtonActive(false)
        }
    }, [target]);

    return (
        <div className="postTituloContainer" ref={RefDiv}>
            {
                activeEditTitle
                    ? <div

                        className="PostTitleSite"
                        onMouseEnter={handleOpenEditTitleMenu}
                        onMouseLeave={handleCloseEditTitleMenu}
                        onClick={handleActiveEditTitle}
                    >
                        <h3>{item.titulo}</h3>
                        <img
                            className={`editPostTitle ${editButtonActive ? 'editPostTitleActivo' : ''}`}
                            src={editIcon}
                            alt="editIcon"
                        />
                    </div>
                    : <div>
                        <form
                            onChange={handleOnChange}
                        >
                            <input className="formEditTitleTarget" required type="text" autoFocus name='titulo' placeholder={item.titulo} value={newName.titulo} />
                            <button
                                className="formEditTitleTarget"
                                onClick={updatePostName}
                            >
                                Actualizar
                            </button>
                        </form>
                    </div>
            }

        </div>
    )
}
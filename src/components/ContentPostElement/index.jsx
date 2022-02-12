import './ContentPostElement.css'
import { useState, useEffect } from "react"
import editIcon from '../../media/editar.png'
import { getFirestore } from '../../firebase'
import { useGancho } from '../../context/GanchoContext'

export default function ContentPostElement({ item, target }) {

    const [editContentButtonActive, setEditContentButtonActive] = useState(false)
    const [activeEditContent, setActiveEditContent] = useState(true)

    const [newContent, setNewContent] = useState({
        content: item.postContent
    })

    const { gancho, changeGancho } = useGancho()

    const handleOpenEditContentMenu = () => setEditContentButtonActive(true)

    const handleCloseEditContentMenu = () => setEditContentButtonActive(false)

    const handleActiveEditContent = () => setActiveEditContent(false)

    const updatePostContent = (event) => {
        event.preventDefault()

        setEditContentButtonActive(false)
        setActiveEditContent(true)

        const db = getFirestore()

        db.collection('posts').doc(item.id).update({
            postContent: newContent.content
        })
            .then(() => {
                console.log("Document successfully updated!");
                changeGancho(!gancho)
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    const handleOnChange = (e) => setNewContent({
        ...newContent,
        [e.target.name]: e.target.value
    })

    console.log(newContent)

    useEffect(() => {
        if (activeEditContent) {
            const textNuevo = item.postContent.replace(/\n/g, `<br />`)
            const txt = document.getElementById(`txt-${item.id}`)
            txt.innerHTML = textNuevo
        }
    }, [activeEditContent, item.postContent])

    useEffect(() => {
        if (
            target.className === 'postElementContainer' 
            || target.className === 'fecha-container' 
            || target.className === 'text-container'
            || target.className === 'formEditContent'
            && activeEditContent === false
        ) {
            setActiveEditContent(true)
            setEditContentButtonActive(false)
        }
    }, [target]);

    return (
        <div className='textContainer'
            onMouseEnter={handleOpenEditContentMenu}
            onMouseLeave={handleCloseEditContentMenu}
        >
            {
                activeEditContent
                    ? <>
                        <p className='text-container' id={`txt-${item.id}`}>{decodeURI(item.postContent)}</p>
                        <img
                            className={`editPostContent ${editContentButtonActive ? 'editPostContentActivo' : ''}`}
                            src={editIcon}
                            alt="editIcon"
                            onClick={handleActiveEditContent}
                        />
                    </>
                    : <>
                        <form
                            className='formEditContent'
                            onChange={handleOnChange}
                        >
                            <textarea autoFocus required id='textareaEdit' name='content' >{newContent.content}</textarea>
                            <button onClick={updatePostContent}>Actualizar</button>
                        </form>
                    </>
            }

        </div>
    )
}
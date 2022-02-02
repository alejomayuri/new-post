import './PostElement.css'
import { useState, useEffect } from "react";
import editIcon from '../../media/editar.png'

export default function PostElement({ item }) {

    const [editButtonActive, setEditButtonActive] = useState(false)
    const [activeEditTitle, setActiveEditTitle] = useState(true)
    const [newName, setNewName] = useState({
        nombre: item.titulo
    })

    useEffect(() => {
        const textNuevo = item.postContent.replace(/\n/g, `<br />`)
        const txt = document.getElementById(`txt-${item.id}`)
        txt.innerHTML = textNuevo
    }, [])

    const handleOnChange = (e) => setNewName({
        ...newName,
        [e.target.name]: e.target.value
    })

    const handleOpenEditTitleMenu = () => {
        setEditButtonActive(true)
    }

    const handleCloseEditTitleMenu = () => {
        setEditButtonActive(false)
    }

    const handleActiveEditTitle = () => {
        setActiveEditTitle(false)
    }

    const handleDectiveEditTitle = () => {
        if (activeEditTitle === false && editButtonActive === false) setActiveEditTitle(true)
    }

    return (
        <div className='postElementContainer'
            onClick={handleDectiveEditTitle}
        >
            <div className="postTituloContainer"
                onMouseEnter={handleOpenEditTitleMenu}
                onMouseLeave={handleCloseEditTitleMenu}
                onClick={handleActiveEditTitle}
            >
                {
                    activeEditTitle
                        ? <>
                            <h3>{item.titulo}</h3>
                            <img
                                className={`editPostTitle ${editButtonActive ? 'editPostTitleActivo' : ''}`}
                                src={editIcon}
                                alt="editIcon"
                                
                            />
                        </>
                        : <>
                            <form
                                className=''
                                // onSubmit={updateColection}
                                onChange={handleOnChange}
                            >
                                <input required type="text" name='nombre' placeholder={item.titulo} value={newName.nombre} />
                                <button>Actualizar</button>
                            </form>
                        </>
                }

            </div>
            <p className='text-container' id={`txt-${item.id}`}>{decodeURI(item.postContent)}</p>
            <p className='fecha-container'>{`Creado el ${item.fechaCreado}`}</p>
        </div>
    )
}
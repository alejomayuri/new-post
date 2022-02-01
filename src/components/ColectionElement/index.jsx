import React, { useState } from "react"
import './ColectionElement.css'
import { useColection } from "../../context/ColectionSelect"
import deleteImg from "../../media/bin.png"
import { useColections } from "../../hooks/useColections"
import editeImg from "../../media/editar.png"

function ColectionElement({ item, useKeyword = {}, setFunction, openDeleteBox, openEditBox }) {
    const { currentColection, changeColection } = useColection()
    const keyword = useKeyword
    const [deleteActive, setDeleteActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const { colections } = useColections({ keyword })

    const handleChangeColection = (a) => {
        changeColection(a)
        setFunction(colections.filter(elemeto => elemeto.colection === item.id))
    }

    const handleOpenColectionMenu = () => {
        setDeleteActive(true)
        setEditActive(true)
    }

    const handleCloseColectionMenu = () => {
        setDeleteActive(false)
        setEditActive(false)
    }



    return (
        <>
            <div
                id={item.id}
                className={`elementColection ${item.id === currentColection.id ? 'colectionActivo' : ''}`}
                onClick={() => handleChangeColection(item)}
                onMouseEnter={handleOpenColectionMenu}
                onMouseLeave={handleCloseColectionMenu}
            >
                <p>{item.nombre}</p>
                <div className="colectionMenu">
                    <img
                        src={editeImg}
                        onClick={() => openEditBox(true)}
                        alt="edit img"
                        className={`editColectionItem ${editActive ? 'editColectionItemActivo' : ''}`}
                    />
                    <img
                        className={`deleteColectionItem ${deleteActive ? 'deleteColectionItemActivo' : ''}`}
                        onClick={() => openDeleteBox(true)}
                        src={deleteImg}
                        alt="delete img"
                    />
                </div>
            </div>
        </>
    )
}

export default React.memo(ColectionElement)
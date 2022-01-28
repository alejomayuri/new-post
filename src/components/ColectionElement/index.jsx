import React from "react";
import { useColection } from "../../context/ColectionSelect"

function ColectionElement({ item }) {
    const { currentColection, changeColection } = useColection()

    const handleChangeColection = (a) => {
        changeColection(a)
    }

    return (
        <div
            id={item.id}
            className={`elementColection ${item.id === currentColection.id ? 'colectionActivo' : ''}`}
            onClick={() => handleChangeColection(item)}
        >
            <p>{item.nombre}</p>
        </div>
    )
}

export default React.memo(ColectionElement)
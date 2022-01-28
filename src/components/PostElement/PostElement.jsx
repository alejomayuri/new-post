import { useEffect } from "react";

export default function PostElement({ item }) {

    useEffect(() => {
        const textNuevo = item.postContent.replace(/\n/g, `<br />`)
        const txt = document.getElementById(`txt-${item.id}`)
        txt.innerHTML = textNuevo
    }, [])

    return (
        <div>
            <h3>{item.titulo}</h3>
            <p className='text-container' id={`txt-${item.id}`}>{decodeURI(item.postContent)}</p>
            <p className='fecha-container'>{`Creado el ${item.fechaCreado}`}</p>
        </div>
    )
}
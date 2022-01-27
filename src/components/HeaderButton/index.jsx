import { useState, useEffect } from "react"

export default function HeaderButton ({value, setFunction} = {}) {
    const [open, setOpen] = useState(false)
   
    const push = () => setOpen(!open)

    useEffect(() => {
        setFunction(open)
    }, [open])

    return (
        <button onClick={push} >
            {value}
        </button>
    )
}
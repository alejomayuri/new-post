
export default function HeaderButton ({value, setFunction, isOpen, disabled} = {}) {
   
    const push = () => setFunction(!isOpen)

    return (
        <button disabled={disabled} onClick={push} >
            {value}
        </button>
    )
}
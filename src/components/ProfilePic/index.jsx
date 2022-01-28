import { useAuth } from "../../context/AuthContext"

export default function ProfilePic ({ isOpen, setFunction }) {

    const { currentUser } = useAuth()

    const push = () => setFunction(!isOpen)

    return <img onClick={push} src={currentUser.photoURL} alt="photoURL" />
}
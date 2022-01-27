import './Home.css'
import 'firebase/compat/firestore'
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import PostColeccion from "../../components/PostColeccion";
import PostContainer from "../../components/PostContainer";

function Home() {

    const { currentUser } = useAuth()

    return (
        <>
            <Header />
            <main>
                <PostColeccion user={currentUser.uid} />
                <PostContainer />
            </main>
        </>
    );
}

export default Home;

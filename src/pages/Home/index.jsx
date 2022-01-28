import './Home.css'
import 'firebase/compat/firestore'
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import PostColeccion from "../../components/PostColeccion";
import PostContainer from "../../components/PostContainer";
import { ColectionProvider } from '../../context/ColectionSelect';

function Home() {

    return (
        <>
            <Header />
            <main>
                <ColectionProvider>
                    <PostColeccion colectionName='colecciones' />
                    <PostContainer colectionName='posts' />
                </ColectionProvider>
            </main>
        </>
    );
}

export default Home;

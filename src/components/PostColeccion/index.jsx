import './PostColeccion.css'
import { useColections } from '../../hooks/useColections';
import { useAuth } from '../../context/AuthContext';
import ColectionElement from '../ColectionElement';
import GifCargando from '../GifCargando';

const PostColeccion = ({ colectionName }) => {

    const keyword = colectionName

    const { colections, loading } = useColections({ keyword })

    const { currentUser } = useAuth()

    return (
        <div className='postColection'>
            <h3>Colecciones</h3>
            {
                loading
                    ? <GifCargando />
                    : colections.filter(colection => colection.usuario === currentUser.uid).length !== 0
                        ? colections.filter(colection => colection.usuario === currentUser.uid).map(item => (
                            <ColectionElement key={item.id} item={item} />
                        ))
                        : <p className='noColections'>No tienes colecciones</p>
            }

        </div>
    );
}

export default PostColeccion;
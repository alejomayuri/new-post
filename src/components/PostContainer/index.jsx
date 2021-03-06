import './PostContainer.css'
import { useColection } from '../../context/ColectionSelect';
import { useColections } from '../../hooks/useColections';
import PostElement from '../PostElement/PostElement';

const PostContainer = ({ colectionName }) => {

    const { currentColection } = useColection()

    const keyword = colectionName

    const { colections } = useColections({ keyword })

    return (
        <div className='postContainer'>
            {
                Object.keys(currentColection).length === 0
                    ? <p className='noColections'>Selecciona una colección</p>
                    : colections.filter(post => post.colection === currentColection.id).length !== 0
                        ? colections.filter(post => post.colection === currentColection.id).map(item => (
                            <PostElement key={item.id} item={item} />
                        ))
                        : <p className='noColections'>No tienes posts en esta colección</p>
            }
        </div>
    );
}

export default PostContainer;
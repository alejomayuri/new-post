import './PostColeccion.css'
import { useColections } from '../../hooks/useColections';
import { useAuth } from '../../context/AuthContext';
import ColectionElement from '../ColectionElement';
import { useState } from 'react';
import DeleteColectionBox from '../DeleteColectionBox';
import EditColectionBox from '../EditColectionBox';

const PostColeccion = ({ colectionName }) => {
    const keyword = colectionName

    const [openDeleteColectionBox, setOpenDeleteColectionBox] = useState(false)
    const [openEditColectionBox, setOpenEditeColectionBox] = useState(false)
    const [postOfColection, setPostOfColection] = useState([])

    const { colections } = useColections({ keyword })
    const { currentUser } = useAuth()

    return (
        <>
            <div className='postColection'>
                <h3>Colecciones</h3>
                {
                    colections.filter(colection => colection.usuario === currentUser.uid).length !== 0
                        ? colections.filter(colection => colection.usuario === currentUser.uid).map(item => (
                            <ColectionElement
                                openEditBox={setOpenEditeColectionBox}
                                openDeleteBox={setOpenDeleteColectionBox}
                                setFunction={setPostOfColection}
                                useKeyword='posts'
                                key={item.id}
                                item={item}
                            />
                        ))
                        : <p className='noColections'>No tienes colecciones</p>
                }
                <DeleteColectionBox
                    open={openDeleteColectionBox}
                    close={setOpenDeleteColectionBox}
                    postsToDelete={postOfColection}
                />
                <EditColectionBox
                    open={openEditColectionBox}
                    close={setOpenEditeColectionBox}
                />
            </div>
        </>

    );
}

export default PostColeccion;
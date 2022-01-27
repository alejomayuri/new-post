import { getFirestore } from "../firebase";

export default function getColections ({ keyword = 'colecciones'} = {}) {
    const dbQuery = getFirestore()
    const traer = dbQuery.collection(keyword)

    return traer.get()
}
 
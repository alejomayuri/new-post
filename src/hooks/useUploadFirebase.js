import { getFirestore } from "../firebase";

export default function useUploadFirebase ({formData, colection} = {}) {
    const db = getFirestore();
    db.collection(colection).add(formData)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
}
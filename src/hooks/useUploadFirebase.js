import { getFirestore } from "../firebase";

export default function useUploadFirebase ({formData} = {}) {
    const db = getFirestore();
    db.collection('posts').add(formData)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
}
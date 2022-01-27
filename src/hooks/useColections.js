import { useEffect, useState } from "react";
import getColections from "../services/getColections";

export function useColections({ keyword } = { keyword: null }) {
    
    const keywordToUse = keyword
    
    const [loading, setLoadig] = useState(false)

    const [colections, setColections] = useState([])

    useEffect(() => {
        setLoadig(true)

        getColections({ keyword: keywordToUse })
            .then(({ docs }) => {
                setColections(docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
    }, [])

    return {colections, loading}
}
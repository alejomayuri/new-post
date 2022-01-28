import { useEffect, useState } from "react";
import getColections from "../services/getColections";
import { useGancho } from "../context/GanchoContext";

export function useColections({ keyword } = { keyword: null }) {
    
    const { gancho } = useGancho()

    const keywordToUse = keyword
    
    const [loading, setLoadig] = useState(false)
    const [colections, setColections] = useState([])

    useEffect(() => {
        setLoadig(true)

        getColections({ keyword: keywordToUse })
            .then(({ docs }) => {
                setColections(docs.map(doc => ({ id: doc.id, ...doc.data() })))
                setLoadig(false)
            })
    }, [gancho])

    return {colections, loading}
}
import { createContext, useState, useContext } from "react";

const ColectionContext = createContext();

export const useColection = () => useContext(ColectionContext)
 
export const ColectionProvider = (props) => {

    const [currentColection, setCurrentColection] = useState({})

    const changeColection = (colection) => {
        setCurrentColection(colection)
    }

    const value = {currentColection, changeColection}

    return (
        <ColectionContext.Provider value={value}>
            {props.children}
        </ColectionContext.Provider>
    )
}
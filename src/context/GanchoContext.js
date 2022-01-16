import { createContext, useState, useContext } from "react";

const GanchoContext = createContext();

export const useGancho = () => useContext(GanchoContext)
 
export const GanchoProvider = (props) => {

    const [gancho, setGancho] = useState(true)

    const changeGancho = (bool) => {
        setGancho(bool)
    }

    const value = {gancho, changeGancho}

    return (
        <GanchoContext.Provider value={value}>
            {props.children}
        </GanchoContext.Provider>
    )
}
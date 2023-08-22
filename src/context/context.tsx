import { createContext, useContext, useEffect, useRef, useState } from "react"


type defaultContextType = {
    gallaryCanvas: boolean,
    updateGallaryCanvas: (canvas: boolean) => void
}

const defaultContext ={
    gallaryCanvas: true || false,
    updateGallaryCanvas: () => {}
  
}




export const WorkContext = createContext<defaultContextType>(defaultContext)

export function useWorkContext() { 
  return useContext(WorkContext)
}

interface Props {children: React.ReactNode}

const WorkContextProvider:React.FC<Props> = ({children}) => {
    const [gallaryCanvas, setGallaryCanvas] = useState(true);
    
    function updateGallaryCanvas(canvas:boolean){
        setGallaryCanvas(canvas)
    }
    

    // useEffect(()=>{
    //     let timer:any
    //     timer = setTimeout((
    //         () => {
    //             console.log(gallaryCanvas)
    //         }
    //     ), 5000)
    //     return () => clearTimeout(timer)
    // },[])
    const providerValue = {
        gallaryCanvas,
        updateGallaryCanvas
    }


  return <>
        <WorkContext.Provider value={providerValue}>
            { children }
        </WorkContext.Provider>
    </>
}

export default WorkContextProvider
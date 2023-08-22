import HeaderBar from "@/components/HeaderBar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GallaryCanvas from "./GallaryCanvas";


const Gallary:React.FC = () => {
    const go = useNavigate()
    const [ gallaryCanvas, setGallaryCanvas] = useState(true)
    const gallaryCanvasRef = useRef(gallaryCanvas)

    useEffect(()=>{
        let timer:any
        gallaryCanvasRef.current = false
        timer = setTimeout((
            () => {
                setGallaryCanvas(gallaryCanvasRef.current)
            }
        ), 5000)
        return () => clearTimeout(timer);
    },[])

    useEffect(()=>{
        let timer:any
        timer = setTimeout((
            () => {
                go('/work')
            }
        ), 8000)
        return () => clearTimeout(timer);
    },[])
    

   
    return <>
        <div className='w-screen h-screen bg-[#fffbf0] flex'>
            <div className="fixed top-0 w-screen z-50">
                <HeaderBar needAnimation={true}/>
            </div>
            <div className={`${ gallaryCanvas ? null : 'animatecss animatecss-backOutUp' } m-auto border-2 border-black p-[20px] z-20`}>
                <div className="flex flex-col items-start justify-center w-[300px] h-[300px] z-20 ">
                    <h1 className="text-[40px] leading-[35px]">George</h1>
                    <h1 className="text-[40px] leading-[35px]">Foundation</h1>
                    <h1 className="text-[40px] leading-[35px] self-end ">Graphic</h1>
                    <h1 className="text-[40px] leading-[35px] self-end ">Design</h1>
                </div>
            </div>
        </div>
        
        <div className="absolute top-0 left-0 z-10 border">
            <GallaryCanvas gallaryCanvas={gallaryCanvas}/>
        </div> 
    </>
  };
    
  export default Gallary;
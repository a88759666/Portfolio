import ocean from "@/assets/images/bg12.jpg"
import line from "@/assets/images/line.png"
import photo from "@/assets/images/photo.png"
import statue from "@/assets/images/statue.png"
import workblack from "@/assets/images/workblack.png"
import worklogo from "@/assets/images/worklogo.png"
import paper from "@/assets/images/paper.png"
import paint from "@/assets/images/paint.png"

import work1 from "@/assets/images/bg1.jpg";
import work2 from "@/assets/images/bg2.jpg";
import work3 from "@/assets/images/bg3.jpg";
import work4 from "@/assets/images/bg4.jpg";
import work5 from "@/assets/images/bg5.jpg";
import work6 from "@/assets/images/bg6.jpg";
import work7 from "@/assets/images/bg7.jpg";
import work8 from "@/assets/images/bg8.jpg";
import work9 from "@/assets/images/bg9.jpg";
import work10 from "@/assets/images/bg10.png";
import work11 from "@/assets/images/bg11.jpg";
import work13 from "@/assets/images/bg13.jpg";
import work14 from "@/assets/images/bg14.jpg";
import work15 from "@/assets/images/bg15.jpg";

import HeaderBar from "@/components/HeaderBar"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




import LoadingCanvas from "@/pages/singleWork/components/LoadingCanvas"
import Footer from "./components/Footer"
import Modal from "./components/Modal"


type StepState = 'work' | 'info' | 'explore'
const SingleWork:React.FC = () => {
    const [ currentId, setCurrentId ] = useState('')
    const go = useNavigate()
    const [ showModal, setShowModal] = useState(false)
    const [ currentStep, setCurrentStep] = useState<StepState>('work')
    
    function closeModal() {
        if(currentStep === 'work'){
            setCurrentStep('info')
        } else if(currentStep === 'info'){
            setCurrentStep('explore')
        } else if(currentStep === 'explore'){
            setShowModal(false)
        } 
    }
    function openModalClick(currentStep:StepState) {
        setShowModal(true)
        setCurrentStep(currentStep)

    }
      
    useEffect(()=>{
        setCurrentId(localStorage.getItem('currentId') as string)
    },[])

    
    // useEffect(()=>{
    //     console.log(currentId)
    // })

    return <>
        <div className='w-screen h-screen bg-[#fffbf0] flex flex-col relative max-h-screen border'>
            <div className="fixed top-0">
                <HeaderBar needAnimation={false}/>
            </div>
            <div 
                className="fixed top-[100px] left-[30px] flex flex-row items-center gap-[15px] cursor-pointer"
                onClick={()=>{go('/work')}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <h1 className="text-[24px] font-extralight">Back</h1>
            </div>

            <div className="absolute top-1/2 left-1/2 z-50 w-[30%] translate-x-[-50%] translate-y-[-50%] ">
                {   currentId === 'work1' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work1} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work2' && 
                    <div className={`w-[100%] pt-[125%] overflow-hidden cursor-pointer relative`}>
                        <img src={work2} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work3' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work3} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work4' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work4} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work5' && 
                    <div className={`w-[100%] pt-[45%] overflow-hidden cursor-pointer relative`}>
                        <img src={work5} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work6' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work6} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work7' && 
                    <div className={`w-[100%] pt-[100%] overflow-hidden cursor-pointer relative`}>
                        <img src={work7} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work8' && 
                    <div className={`w-[100%] pt-[45%] overflow-hidden cursor-pointer relative`}>
                        <img src={work8} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work9' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work9} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work10' && 
                    <div className={`w-[100%] pt-[100%] overflow-hidden cursor-pointer relative`}>
                        <img src={work10} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work11' && 
                    <div className={`w-[100%] pt-[70%] overflow-hidden cursor-pointer relative`}>
                        <img src={work11} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work13' && 
                    <div className={`w-[100%] pt-[45%] overflow-hidden cursor-pointer relative`}>
                        <img src={work13} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work14' && 
                    <div className={`w-[100%] pt-[125%] overflow-hidden cursor-pointer relative`}>
                        <img src={work14} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
                {   currentId === 'work15' && 
                    <div className={`w-[100%] pt-[100%] overflow-hidden cursor-pointer relative`}>
                        <img src={work15} className="absolute top-0 left-0 overflow-hidden block object-cover w-[100%] h-[100%]"/>
                    </div>
                }
            </div>
            <div className="absolute top-[55%] left-[60%] translate-x-[-50%] translate-y-[-50%] z-10">
                <img src={ocean} className="w-[500px] h-[600px]"/>
            </div>
           
            {/* <motion.div
                style={{
                    borderRadius: 30,
                    perspective: 200
                }}
                className="absolute border-4 top-[0px] left-[300px] w-[800px] h-[600px] z-50"
                onMouseMove={handleMouse}
            >
                <motion.div 
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY
                    }}
                    className="mt-[200px]"
                >
                    
                </motion.div>
            </motion.div> */}
            <div className="select-none absolute top-[35%] left-[40%] translate-x-[-50%] translate-y-[-50%]  ">
                <img src={line} className="w-[800px] h-[600px]"/>
            </div>
            <div className="select-none absolute top-[65%] right-[-2%]  translate-y-[-50%] z-10">
                <img src={workblack} className="w-[900px]"/>
            </div>
            <div className="select-none absolute top-[70%] left-[25%] translate-x-[-50%] translate-y-[-50%] z-10">
                <img src={statue} className="w-[400px]"/>
            </div>
            <div className="select-none absolute top-[30%] left-[72%] translate-x-[-50%] translate-y-[-50%] rotate-45 z-10">
                <img src={paper} className="w-[300px]"/>
            </div>
            <div className="select-none absolute top-[22%] left-[20%] translate-x-[-10%] translate-y-[-50%] z-50 ">
                <img src={worklogo} className="w-[600px]"/>
            </div>
            <div className="select-none absolute top-[76%] left-[20%] translate-x-[-50%] translate-y-[-50%]  ">
                <img src={paint} className="w-[400px]"/>
            </div>
            <div className="select-none absolute top-[0%] right-[13%] max-h-[88vh] overflow-hidden">
                <LoadingCanvas />
            </div>
            { showModal && currentStep === 'work' ? <Modal closeModal={closeModal} id={currentId} currentStep={currentStep}/> : null  }
            { showModal && currentStep === 'info' ? <Modal closeModal={closeModal} id={currentId} currentStep={currentStep}/> : null  }
            { showModal && currentStep === 'explore' ? <Modal closeModal={closeModal} id={currentId} currentStep={currentStep}/> : null  }

            <div className="fixed bottom-0">
                <Footer workName="" openModal={openModalClick}/>
            </div>
        </div>
    </>
}

export default SingleWork
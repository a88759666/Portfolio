import { useEffect, useState } from "react";
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

import whiteBg from "@/assets/images/whiteBg.jpg";
import whiteBg2 from "@/assets/images/whiteBg2.jpg";

import { motion } from "framer-motion";
import { useGetWorksQuery } from "@/services/homeService";

type ExploreProps = {
    id: string
}
const ExploreComponent:React.FC<ExploreProps> = ({ id }) => {
    const { data, isLoading } = useGetWorksQuery("all")
    const foundWork = data?.find((work) => work.workId === id);
    const info1 = foundWork?.exploreInfo?.split(",")[0]
    const info2 = foundWork?.exploreInfo?.split(",")[1]
    return <>
        <div className="text-center">
            <text className="leading-[20px] cursor-pointer">
                {foundWork ? <a href={info1}>{info1}</a> : "No matching workexplore found."} 
                <hr className="mb-[10px]"/>   
                {foundWork ? <a href={info2}>{info2}</a> : "No matching workexplore found."}    
            </text>
        </div>
    </>
}

type InfoProps = {
    id: string,
    imageSrc: string
}
const InfoComponent:React.FC<InfoProps> = ({ id, imageSrc }) => {
    const { data, isLoading } = useGetWorksQuery("all")
    const foundWork = data?.find((work) => work.workId === id);
    return <>
        <div className="w-[100%] overflow-hidden cursor-pointer relative mb-[10px]">
          <img src={imageSrc} className="overflow-hidden block object-cover w-[100%] h-[100%]" />
        </div>
        <text className="leading-[16px]">
            {foundWork ? foundWork.info : "No matching work found."}
        </text>
    </>
}

type WorkProps = {
    id: string,
    imageSrc: string
}
const WorkComponent:React.FC<WorkProps> = ({ id, imageSrc }) => {
    const isSmallWidth = id === 'work14' || id === 'work2'
    let containerClassName = isSmallWidth
      ? "w-[70%] overflow-hidden cursor-pointer mx-auto"
      : "w-[100%] overflow-hidden cursor-pointer relative"
  
    if ( id === 'work5' || id === 'work8') {
      containerClassName += " scale-125";
    } else if (id === 'work15') {
      containerClassName += "border-4 border-black ";
    }
  
    return (
      <div className={containerClassName}>
        <img src={imageSrc} className="overflow-hidden block object-cover" />
      </div>
    )
}

type props = {
    closeModal: () => void
    id:string
    currentStep: 'work' | 'info' | 'explore'
}

const Modal:React.FC<props> = ({
    closeModal,
    id,
    currentStep
}) => {
    const imageSource = getImageSourceForId(id)
    
    
    function getImageSourceForId(id:string) {
        switch (id) {
          case 'work1': return work1;
          case 'work2': return work2;
          case 'work3': return work3;
          case 'work4': return work4;
          case 'work5': return work5;
          case 'work6': return work6;
          case 'work7': return work7;
          case 'work8': return work8;
          case 'work9': return work9;
          case 'work10': return work10;
          case 'work11': return work11;
          case 'work13': return work13;
          case 'work14': return work14;
          case 'work15': return work15;
          default: return null;
        }
    }

    return <>
        <div
            className="w-screen h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none"
        >
            {/*content*/}
            <motion.div
                initial={{ x:300, opacity:0}}
                whileInView={{ x:0, opacity:1}}
                
                transition={{ 
                  ease: "linear",
                  type: "spring",
                  bounce: 0.4,
                  duration: 2,
                }}
                className="w-screen h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
            >
                {
                    currentStep === 'work' && <div>
                        <div className="shadow-lg focus:outline-none pointer select-none">
                            <img src={whiteBg} className="h-screen"/>
                        </div>
                        <div className="absolute w-[45%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            {imageSource && <WorkComponent id={id} imageSrc={imageSource} />}
                        </div>
                    </div>
                }
                        
                {
                    currentStep === 'info' && <div>
                        <div className="shadow-lg focus:outline-none pointer select-none">
                            <img src={whiteBg2} className="h-screen"/>
                        </div>
                        <div className="absolute w-[45%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <div className="relative w-[100%] pt-[100%] rounded-2xl border-black border-2 overflow-hidden">
                                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <h1 className="text-center">INFORMATION</h1>
                                    <hr className="w-[430px] h-[2px] bg-black mb-[10px]"/>
                                    {imageSource && <InfoComponent id={id} imageSrc={imageSource} />}
                                </div>
                            </div>
                        </div>
                    </div>
                }    
                    
                {
                    currentStep === 'explore' && <div>
                        <div className="shadow-lg focus:outline-none pointer select-none">
                            <img src={whiteBg2} className="h-screen"/>
                        </div>
                        <div className="absolute w-[45%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <div className="relative w-[100%] pt-[100%] rounded-2xl overflow-hidden">
                                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                    <h1 className="text-center text-[40px]">EXPLORE</h1>
                                    <hr className="w-[600px] h-[2px] bg-black mb-[15px]"/>
                                    {imageSource && <ExploreComponent id={id}  />}
                                </div>
                            </div>
                        </div>
                    </div>
                }           
                
            </motion.div>
            <button
                className="right-[100px] absolute top-[50%] transition-x-[-50%] focus:outline-none border-2 border-black rounded-full"
                onClick={closeModal}
            >
                {
                    currentStep === 'work' &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-[80px] h-[80px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                }
                {
                    currentStep === 'info' &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-[80px] h-[80px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                }
                {
                    currentStep === 'explore' &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="w-[80px] h-[80px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  
                }
            </button>
                    
                
                
                
                
        </div>
        
        <div className="opacity-60 fixed inset-0 z-[60] bg-white"></div>
    </>
}

export default Modal
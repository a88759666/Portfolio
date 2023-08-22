import { motion } from "framer-motion";
import React from 'react';
type itemProps = {
    title?: string,
    photo?: string,
    info?: string,
    workId?: string,
    h?: number
    onToggleClick: (id:string) => void
}

const WorkItem:React.FC<itemProps> = ({
    title,
    photo,
    info,
    workId,
    h,
    onToggleClick
}) => {
    const cardHeight = {
      paddingTop: `${h}%`
    }
    
    return<>
      <motion.aside
        initial={{ opacity: 0, y:200}}
        whileInView={{ opacity: 1, y:0}}
        transition={{ 
          ease: "linear",
          // type: "spring",
          bounce: 0.4,
          duration: 0.8 }}
        >
          <div className="flex flex-col items-start max-w-[500px] group">
            <div 
              className="w-[100%]"
              onClick={() => { workId && onToggleClick?.(workId)}}
            >
              <div className="w-[100%]  rounded-2xl overflow-hidden cursor-pointer relative" style={cardHeight}>
                  <img src={photo} className="absolute top-0 left-0 overflow-hidden transition-transform duration-1000 block object-cover w-[100%] h-[100%]  group-hover:scale-150" />
                  <div className="absolute top-0 left-0 bg-[#ffe8a7] w-full h-full opacity-0 transition-opacity duration-1000 z-40 group-hover:opacity-70" />
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[28px] font-light opacity-0 z-40 transition-opacity duration-1000 group-hover:opacity-100">VIEW PROJECT</div>
              </div>
            </div>
          
            <div className="mt-[16px]">
                <h1 className="text-[36px] font-semibold">{title}</h1>
            </div>
            <div className="mt-[2px]">
                <h1 className="text-[16px] leading-[28px]">{info}</h1>
            </div>
          </div>
      </motion.aside>
    </>
}

export default WorkItem
import { SetStateAction, useEffect, useRef, useState } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from 'react-player/youtube'
import type { MotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";
type Props = {
  needAnimation: boolean
  handleClickScroll?: (id:string) => void
  setOpen?:React.Dispatch<React.SetStateAction<boolean>>
  open?:boolean
}

const HeaderBar:React.FC<Props> = ({
  needAnimation,
  handleClickScroll,
  setOpen,
  open
}) => {
  const [ scrolling, setScrolling ] = useState(false)
  const [ scrollTop, setScrollTop ] = useState(0)
  const [ playMusic, setPlayMusic ] = useState(true)
  const [ logoUp, setLogoUp] = useState(false)
  const logoUpRef = useRef(logoUp)

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  function onPlayMusic(){
    // ReactPlayer.canPlay('https://youtu.be/NWIz0CqsZiI')
    setPlayMusic(!playMusic)
  }
  useEffect(()=>{
      let timer:any
      logoUpRef.current = true
      timer = setTimeout((
          () => {
            setLogoUp(logoUpRef.current)
          }
      ), 6000)
      return () => clearTimeout(timer);
  })

  useEffect(() => {
    function onScroll(){
      let currentPosition = window.pageYOffset
      setScrollTop(currentPosition)
      if( scrollTop > 60){
        setScrolling(true)
        console.log(scrollTop)

      } else {
        setScrolling(false)
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  },[scrollTop])

  return <>
    <header className={`
      ${
        scrolling === true ? 'bg-[#ffecb7] bg-opacity-80 animatecss animatecss-fadeInDown' : "animatecss animatecss-fadeInUp" 
      } flex flex-row w-screen justify-between items-center p-[30px]`}>
      <div>
      <motion.button
        onClick={()=>{setOpen && setOpen(!open)}}
        className="hidden text-[16px] font-medium cursor-pointer select-none md:block"
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
      >
        MENU
      </motion.button>
      <motion.button
        onClick={()=>{setOpen && setOpen(!open)}}
        className="block text-[16px] font-medium cursor-pointer select-none md:hidden"
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
      >
        <div className="flex flex-col gap-[6px]">
          <div className="w-[30px] h-[2px] bg-black"></div>
          <div className="w-[30px] h-[2px] bg-black"></div>
          <div className="w-[30px] h-[2px] bg-black"></div>
        </div>
      </motion.button>
      <motion.nav
        animate={open ? "open" : "closed"}
        variants={variants}
        transition={{duration: 0.5}}
        className={`open ? 'contents' : 'hidden'`}
        
      >
        <motion.div
          className="absolute top-[20px] bg-white z-50"
        >
          <ul className="px-[30px] py-[15px]">
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mb-[15px] cursor-pointer"
              id="work"
              onClick={()=>{handleClickScroll?.('workSection')}}
            >WORK</motion.li>

            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mb-[15px] cursor-pointer"
              id="about"
              onClick={()=>{handleClickScroll?.('aboutSection')}}
            >ABOUT</motion.li>

            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              id="connect"
              onClick={()=>{handleClickScroll?.('connectSection')}}
            >CONNECT</motion.li>
          </ul>
        </motion.div>
        {/* <h1>MENU</h1> */}
      </motion.nav>
      
      </div>
      { logoUp && needAnimation && <div className="m-auto border-2 border-black p-[4px] z-20">
        <div className="flex flex-col items-start justify-center w-[60px] h-[60px] z-20 ">
            <h1 className="text-[8px] leading-[10px]">George</h1>
            <h1 className="text-[8px] leading-[10px]">Foundation</h1>
            <h1 className="text-[8px] leading-[10px] self-end ">Graphic</h1>
            <h1 className="text-[8px] leading-[10px] self-end ">Design</h1>
        </div>
      </div>
      }
       { needAnimation === false && <div className="m-auto border-2 border-black p-[4px] z-20">
        <div className="flex flex-col items-start justify-center w-[60px] h-[60px] z-20 ">
            <h1 className="text-[8px] leading-[10px]">George</h1>
            <h1 className="text-[8px] leading-[10px]">Foundation</h1>
            <h1 className="text-[8px] leading-[10px] self-end ">Graphic</h1>
            <h1 className="text-[8px] leading-[10px] self-end ">Design</h1>
        </div>
      </div>
      }

      <div>
        { playMusic && <h1 className="text-[16px] font-medium cursor-pointer"
          onClick={onPlayMusic}
        >
          MUSIC OFF
        </h1>
        }
        { playMusic === false && <h1 className="text-[16px] font-medium cursor-pointer"
          onClick={onPlayMusic}
        >
          MUSIC ON
        </h1>

        }
        {/*  Only loads the YouTube player */}
        <ReactPlayer 
          url='https://youtu.be/NWIz0CqsZiI'
          playing={playMusic}
          volume={0.8}
          controls
          style={{display: "none"}}
          
        />
      </div>
    </header>
  </>
};
    
  export default HeaderBar;
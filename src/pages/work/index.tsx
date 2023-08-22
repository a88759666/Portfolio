import Container from "@/components/Container"
import bg from '@/assets/images/bg.jpg'
import bgImage1 from "@/assets/images/bg1.jpg";
import bgImage2 from "@/assets/images/bg2.jpg";
import bgImage3 from "@/assets/images/bg3.jpg";
import bgImage4 from "@/assets/images/bg4.jpg";
import bgImage5 from "@/assets/images/bg5.jpg";
import bgImage6 from "@/assets/images/bg6.jpg";
import bgImage7 from "@/assets/images/bg7.jpg";
import bgImage8 from "@/assets/images/bg8.jpg";
import bgImage9 from "@/assets/images/bg9.jpg";
import bgImage10 from "@/assets/images/bg10.png";
import bgImage11 from "@/assets/images/bg11.jpg";
import bgImage13 from "@/assets/images/bg13.jpg";
import bgImage14 from "@/assets/images/bg14.jpg";
import bgImage15 from "@/assets/images/bg15.jpg";

import about from "@/assets/images/about.png";
import cd from "@/assets/images/cd.png";


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import FooterWork from "@/pages/work/components/FooterWork";
import { motion, useMotionValue, useTransform, useScroll, useSpring, useVelocity, useAnimationFrame, transform } from "framer-motion";
import SubButton from "@/components/SubButton";
import { wrap } from "@motionone/utils";
import ReactPlayer from "react-player";
import WorkItem from "./components/WorkItem";
import ParallaxText from "./components/ParallaxTest";
import { useGetWorksQuery } from "@/services/homeService";






const WorkShop:React.FC = () => {
  const { data, isLoading } = useGetWorksQuery("all")
  const go = useNavigate()
  const [ currentId, setCurrentId ] = useState<null|string>(null)
  const [ nameVal, setNameVal] = useState("")
  const [open, setOpen] = useState(false);
  
  //CD Animation
  const { scrollYProgress } = useScroll();
  const rotateDeg = 180 + scrollYProgress.get() * 400

  const baseY1 = useMotionValue(0)
  const baseY2 = useMotionValue(0)

  const baseVelocity1 = -10
  const baseVelocity2 = 10
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const distanceY1 = useTransform(baseY1, (v) => `${wrap(-20, 40, v)}%`);
  const distanceY2 = useTransform(baseY2, (v) => `${wrap(-20, 40, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy1 = directionFactor.current * baseVelocity1 * (delta / 1000);
    let moveBy2 = directionFactor.current * baseVelocity2 * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy1 += directionFactor.current * moveBy1 * velocityFactor.get();
    moveBy2 += directionFactor.current * moveBy2 * velocityFactor.get();

    baseY1.set(baseY1.get() + moveBy1);
    baseY2.set(baseY2.get() + moveBy2);
    
    // console.log('moveBy1:',moveBy1)
    // console.log('moveBy2:',moveBy2)

    // console.log('baseY1',baseY1)
    // console.log('baseY2',baseY2)


  })

  function entryWork(id:string){
    setCurrentId(id)
    localStorage.setItem("currentId", id)
    if(currentId !== null ){
      go('/singleWork')
    }
  }


  function onChangeNameHandler(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget) {
        setNameVal(event.currentTarget.value)
    }
  }
  // square Animation
  const x2 = useMotionValue(100);
  const y2 = useMotionValue(100);

  const rotateX = useTransform(y2, [0, 200], [10, -10]);
  const rotateY = useTransform(x2, [0, 200], [-10, 10]);

  function handleMouse(event:any) {
      const rect = event.currentTarget.getBoundingClientRect();
      x2.set(event.clientX - rect.left );
      y2.set(event.clientY - rect.top);
  }

  const handleClickScroll = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      console.log(element)
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(!open)
  }

  
  useEffect(()=>{
    setCurrentId(localStorage.getItem('currentId') as string)
  },[])
  
  function getImagePhoto(photo:string) {
    switch (photo) {
      case '@/assets/images/bg1.jpg': return bgImage1;
      case '@/assets/images/bg2.jpg': return bgImage2;
      case '@/assets/images/bg3.jpg': return bgImage3;
      case '@/assets/images/bg4.jpg': return bgImage4;
      case '@/assets/images/bg5.jpg': return bgImage5;
      case '@/assets/images/bg6.jpg': return bgImage6;
      case '@/assets/images/bg7.jpg': return bgImage7;
      case '@/assets/images/bg8.jpg': return bgImage8;
      case '@/assets/images/bg9.jpg': return bgImage9;
      case '@/assets/images/bg10.jpg': return bgImage10;
      case '@/assets/images/bg11.jpg': return bgImage11;
      case '@/assets/images/bg13.jpg': return bgImage13;
      case '@/assets/images/bg14.jpg': return bgImage14;
      case '@/assets/images/bg15.jpg': return bgImage15;
      default: return null;
    }
  }
  function getLessString(info:string){
    return info.substring(0,60).concat("...")
  }
  return<>
    <div className="fixed top-0 h-screen w-screen left-0 z-0 opacity-20 flex flex-row overflow-hidden">
      <img src={bg} />
      <img src={bg} />
      <img src={bg} />
    </div>
    <div className="fixed top-0 z-50">
      <HeaderBar 
        needAnimation={false}
        handleClickScroll={handleClickScroll}
        setOpen={setOpen}
        open={open}
      />
    </div>
    <div className="top-[20%] absolute">
      <div className="w-screen">
        <Container>
          <motion.aside
            initial={{ opacity: 0, y:200}}
            whileInView={{ opacity: 1, y:0}}
            transition={{ 
              ease: "linear",
              duration: 0.8 
            }}
            id="workSection"
          >
              <h1 className="text-[100px] font-bold animatecss animatecss-slideInLeft animation-delay-1000 md:text-[200px]">ALL WORK</h1>
          </motion.aside>
    
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <li className="col-span-1">
              <ul className="flex flex-col gap-5">
                { data?.map((work,index) =>{
                  const {
                    title,
                    id,
                    h, 
                    photo,
                    info,
                    workId
                  } = work
                  let photoTransfer = getImagePhoto(photo as string) as string | undefined
                  let infoTransfer = getLessString(info as string) as string | undefined
                  return (
                    <div key={id}>
                      <WorkItem 
                        h={h} 
                        title = {title}
                        photo = {photoTransfer}
                        info = {infoTransfer}
                        workId={workId}
                        onToggleClick={entryWork}
                      />
                    </div>
                  )
                }).slice(0, 5)}
                
              </ul>
            </li>
            <li className="col-span-1">
              <ul className="flex flex-col gap-5">
              { data?.map((work,index) =>{
                  const {
                    title,
                    id,
                    h, 
                    photo,
                    info,
                    workId
                  } = work
                  let photoTransfer = getImagePhoto(photo as string) as string | undefined
                  let infoTransfer = getLessString(info as string) as string | undefined
                  return (
                    <div key={id}>
                      <WorkItem 
                        h={h} 
                        title = {title}
                        photo = {photoTransfer}
                        info = {infoTransfer}
                        workId={workId}
                        onToggleClick={entryWork}
                      />
                    </div>
                  )
                }).slice(5, 10)}
                
              </ul>
            </li>
            <li className="col-span-1">
              <ul className="flex flex-col gap-5">
              { data?.map((work,index) =>{
                  const {
                    title,
                    id,
                    h, 
                    photo,
                    info,
                    workId
                  } = work
                  let photoTransfer = getImagePhoto(photo as string) as string | undefined
                  let infoTransfer = getLessString(info as string) as string | undefined
                  return (
                    <div key={id}>
                      <WorkItem 
                        h={h} 
                        title = {title}
                        photo = {photoTransfer}
                        info = {infoTransfer}
                        workId={workId}
                        onToggleClick={entryWork}
                      />
                    </div>
                  )
                }).slice(10, 14)}
                
              </ul>
            </li>
          </ul>

          {/* //about */}
          <div 
            className="w-full" 
            id="aboutSection"
          >
            <motion.div
              initial={{ opacity: 0, x:-200}}
              whileInView={{ opacity: 1, x:0}}
              transition={{ 
                ease: "linear",
                // type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              <h1 className="text-[120px] font-bold text-center">ABOUT US</h1>
            </motion.div>
            <p className="text-[18px] leading-[32px] w-1/2 text-center mx-auto">我是一名從事平面設計的Freelancer<br></br>近年來開始做網頁設計，UIUX，各種跟Design有關的事物<br></br>大學期間是念經濟系所，所以目前對區塊鏈也有興趣，持續研究中</p>
            <div className="w-full py-[200px] relative">
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 opacity-95">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: rotateDeg}}
                  transition={{ 
                    ease: "linear",
                    // type: "spring",
                    bounce: 0.4,
                    duration: 2,
                    // repeat: Infinity
                  }}
                  className="select-none"
                >
                  <img src={cd} />
                </motion.div>
              </div>
              <div className="absolute top-1/2 right-[5%] translate-y-[-50%] w-[300px] h-[700px] overflow-hidden z-10">
                <motion.div
                  initial={{ y:distanceY1.get()}}
                  whileInView={{ y:300}}
                  transition={{ 
                    ease: "linear",
                    // type: "spring",
                    bounce: 0.4,
                    duration: 1.2,
                  }}
                >
                  <ReactPlayer 
                    url='videos/IGRedux.mp4'
                    playing= {true}
                    loop={true}
                    muted={true}
                    volume={0.8}
                    controls={false}
                    style={{
                      marginLeft: "-160px",
                      transform: "scaleX(.8) scaleY(1.2)"
                    }}
                  />
                </motion.div>
              </div>
              <div className="absolute top-1/2 left-[15%] translate-y-[-60%] translate-x-[-50%] w-[300px] h-[800px] overflow-hidden z-10">
                <motion.div
                  initial={{ y:400}}
                  whileInView={{ y:distanceY2.get()}}
                  className="scale-50"
                  transition={{ 
                    ease: "linear",
                    // type: "spring",
                    bounce: 0.4,
                    duration: 1.2,
                  }}
                >
                  <ReactPlayer 
                    url='videos/BarNFT.mp4'
                    playing= {true}
                    loop={true}
                    muted={true}
                    volume={0.8}
                    controls={false}
                    style={{
                      marginLeft: "-150px",
                      transform: "scaleX(.9) scaleY(1.2)"
                    }}
                    
                  />
                </motion.div>
              </div>
              <section className="overflow-hidden px-[-50px]">
                <ParallaxText baseVelocity={-4}>
                  <div className="flex felx-row">
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                  </div>
                </ParallaxText>
                <ParallaxText baseVelocity={4}>
                  <div className="flex felx-row">
                    <img src={about} className="h-[200px]"/>
                    <img src={about} className="h-[200px]"/>
                    <img src={about} className="h-[200px]"/>
                    <img src={about} className="h-[200px]"/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                  </div>
                </ParallaxText>
                <ParallaxText baseVelocity={-4}>
                  <div className="flex felx-row">
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                    <img src={about} className="h-[200px] "/>
                  </div>
                </ParallaxText>
              </section>
            </div>
            
            
            
          </div>
          
          {/* form */}
          <div 
            className="flex flex-col overflow-hidden mb-[20px] max-w-screen"
            id="connectSection"
          >
            <motion.aside
              initial={{ opacity: 0, x:800}}
              whileInView={{ opacity: 1, x:0}}
              transition={{ 
                ease: "linear",
                duration: 0.8 
              }}
              className="flex flex-row items-center gap-[30px]"
              >
                <h1 className="text-[80px] font-bold animatecss animatecss-slideInLeft animation-delay-1000 md:text-[200px]">CONNECT</h1>
                <div className="w-[100px] h-[8px] bg-black md:w-[700px]"></div>
            </motion.aside>
            <motion.aside
              initial={{ opacity: 0, x:0}}
              whileInView={{ opacity: 1, x:200}}
              transition={{ 
                ease: "linear",
                duration: 0.8 
              }}
              className="flex flex-row items-center gap-[30px]"
              >
                <div className="w-[100px] h-[8px] bg-black md:w-[1200px]"></div>
                <h1 className="text-[80px] font-bold animatecss animatecss-slideInLeft animation-delay-1000 md:text-[200px]">US</h1>
            </motion.aside>
            
          </div>
          <form className="mb-[20px]">
            <div className="flex flex-row gap-[100px]">
              <div className="basis-1/2 flex flex-col gap-[90px]">
              <motion.aside
                initial={{ opacity: 0, y:200}}
                whileInView={{ opacity: 1, y:0}}
                transition={{ 
                  ease: "linear",
                  // type: "spring",
                  bounce: 0.4,
                  duration: 0.8 }}
              >
                <div className="flex flex-col gap-[20px]">
                  <label htmlFor="subject" className="leading-4 font-sans text-[36px] font-bold mb-[4px] text-slate-900">SUBJECT</label>
                    <select 
                      name="subject" 
                      id="subject" 
                      className="border-b-2 border-black border-solid p-3 leading-4 font-sans text-[12px] font-normal text-slate-900 bg-inherit">
                        <option className="padding-[16px]">NEW PROJECT</option>
                        <option className="padding-[16px]">PARTNERSHIP</option>
                        <option className="padding-[16px]">CAREERS</option>
                        <option className="padding-[16px]">OTHER</option>
                    </select>
                </div>
              </motion.aside>
              <motion.aside
                initial={{ opacity: 0, y:200}}
                whileInView={{ opacity: 1, y:0}}
                transition={{ 
                  ease: "linear",
                  // type: "spring",
                  bounce: 0.4,
                  duration: 0.8 }}
              >
                <div className="flex flex-col gap-[20px]">
                  <label htmlFor="gender" className="leading-4 font-sans text-[36px] font-bold mb-[4px] text-slate-900">NAME</label>
                    <input 
                      type="text" 
                        name="name" 
                        value={nameVal}
                        id="name" 
                        placeholder="ENTER YOUR NAME" 
                        onChange={onChangeNameHandler}
                        className="border-b-2 border-black border-solid p-3 leading-4 font-sans text-[12px] font-normal text-slate-900 bg-inherit"
                    />
                </div>
              </motion.aside>
              <motion.aside
                initial={{ opacity: 0, y:200}}
                whileInView={{ opacity: 1, y:0}}
                transition={{ 
                  ease: "linear",
                  // type: "spring",
                  bounce: 0.4,
                  duration: 0.8 }}
              >
                <div className="flex flex-col gap-[20px]">
                  <label htmlFor="email" className="leading-4 font-sans text-[36px] font-bold mb-[4px] text-slate-900">EMAIL</label>
                    <input 
                      type="string" 
                      name="email" 
                      id="email" 
                      placeholder="ENTER YOUR MAIL" 
                      className="border-b-2 border-black border-solid p-3 leading-4 font-sans text-[12px] font-normal  text-slate-900 bg-inherit"
                    />
                </div>
              </motion.aside>
              <motion.aside
                initial={{ opacity: 0, y:200}}
                whileInView={{ opacity: 1, y:0}}
                transition={{ 
                  ease: "linear",
                  // type: "spring",
                  bounce: 0.4,
                  duration: 0.8 }}
                  className="self-end"
              >
                <div>
                  <SubButton
                    btnName="SUBMIT"
                  />
                </div>
              </motion.aside>  
              </div>
              

              <div className="basis-1/2">
                <motion.div
                  style={{
                      borderRadius: 30,
                      perspective: 200
                  }}
                  className="z-50 h-full flex items-center justify-center"
                  onMouseMove={handleMouse}
                  >
                  <motion.div 
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY
                    }}
                    className=""
                  >
                    <div className="m-auto border-2 border-black p-[20px] z-20">
                        <div className="flex flex-col items-start justify-center w-[300px] h-[300px] z-20 ">
                            <h1 className="text-[40px] leading-[35px]">George</h1>
                            <h1 className="text-[40px] leading-[35px]">Foundation</h1>
                            <h1 className="text-[40px] leading-[35px] self-end ">Graphic</h1>
                            <h1 className="text-[40px] leading-[35px] self-end ">Design</h1>
                        </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </form>
        </Container>
        <div className="bg-[#fff7e0] border-t-2 border-black mt-[40px]">
          <Container>
            <FooterWork handleClickScroll={handleClickScroll}/>              
          </Container>
        </div>
        
      </div>
    </div>
    
  </>
}

export default WorkShop
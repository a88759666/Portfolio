import { useEffect, useRef } from "react";
import bgImage1 from "@/assets/images/bg1.jpg";
import bgImage2 from "@/assets/images/bg2.jpg";
import bgImage3 from "@/assets/images/bg3.jpg";
import bgImage4 from "@/assets/images/bg4.jpg";
import bgImage5 from "@/assets/images/bg5.jpg";
import bgImage6 from "@/assets/images/bg6.jpg";
import bgImage7 from "@/assets/images/bg7.jpg";
import bgImage8 from "@/assets/images/bg8.jpg";
import bgImage9 from "@/assets/images/bg9.jpg";
import bgImage10 from "@/assets/images/bg10.jpg";
import bgImage11 from "@/assets/images/bg11.jpg";
import bgImage12 from "@/assets/images/bg12.jpg";
import { useNavigate } from "react-router-dom";

type Props = {
  gallaryCanvas: boolean
}

const GallaryCanvas: React.FC<Props> = ({
  gallaryCanvas
}) => {
    const go = useNavigate()
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    let ww = window.innerWidth
    let wh = window.innerHeight
    class Vec2{
      public x: number;
      public y: number;
    
      constructor(x: number, y: number){
        this.x = x;
        this.y = y;
      }
    
      public set(x: number, y: number){
        this.x = x;
        this.y = y;
      }
    
      public move(x: number, y: number){
        this.x += x;
        this.y += y;
      }
    
      public add(v: Vec2){
        return new Vec2(this.x+v.x, this.y+v.y);
      }
    
      public sub(v: Vec2){
        return new Vec2(this.x-v.x, this.y-v.y);
      }
    
      public mul(s: number){
        return new Vec2(this.x*s, this.y*s);
      }

      public static distance(p1: Vec2, p2: Vec2): number {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
      }

      public get length(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
      }
    
      public set length(nv: number){
        let temp = this.unit.mul(nv);
        this.set(temp.x, temp.y);
      }
    
      public clone(){
        return new Vec2(this.x, this.y);
      }
    
      public toString(){
        return `(${this.x}, ${this.y})`;
      }
    
      public equal(v: Vec2){
        return this.x == v.x && this.y == v.y;
      }
    
      public get angle(){
        return Math.atan2(this.y, this.x);
      }
    
      public get unit(){
        return this.mul(1/this.length);
      }
    }
    //scroll
    const scrollDistanceRef = useRef<number>(0);
    
   
    // Initialize
    useEffect(()=>{
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        let ctx = canvasCtxRef.current
        let time = 0 
        let scrollDistance = 0
        const ww = canvasRef.current.width
        const wh = canvasRef.current.height
        const bgColor = 'rgba(255,251,240)'
        const bgImagesWidth = [bgImage3,bgImage4,bgImage9,bgImage10]
        const bgImagesHeight = [bgImage1,bgImage2,bgImage12]
        const bgImagesSquare = [bgImage6,bgImage7,bgImage11]

        const shuffledImagesWidth = [...bgImagesWidth];
        for (let i = shuffledImagesWidth.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImagesWidth[i], shuffledImagesWidth[j]] = [
            shuffledImagesWidth[j],
            shuffledImagesWidth[i],
          ];
        }
        const shuffledImagesHeight = [...bgImagesHeight];
        for (let i = shuffledImagesHeight.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImagesHeight[i], shuffledImagesHeight[j]] = [
            shuffledImagesHeight[j],
            shuffledImagesHeight[i],
          ];
        }
        const shuffledImagesSquare = [...bgImagesSquare];
        for (let i = shuffledImagesSquare.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImagesSquare[i], shuffledImagesSquare[j]] = [
            shuffledImagesSquare[j],
            shuffledImagesSquare[i],
          ];
        }

        const handleScroll = (e:any) => {
          scrollDistanceRef.current = window.scrollY;
         

          var e = window.event || e; // old IE support
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));


	        scrollDistance+=delta*10;
          return false;
	
          // You can perform additional logic based on the scroll distance
          // For example, update the canvas drawing based on the scroll position
        }
        //設置滑鼠
        let mousePos = new Vec2(0,0)
        let mousePosDown = new Vec2(0,0)
        let mousePosUp = new Vec2(0,0)

        window.addEventListener("wheel", handleScroll,false);
        window.addEventListener("mousemove",mousemove)
        window.addEventListener("mouseup",mouseup)
        window.addEventListener("mousedown",mousedown)
        function mousemove(e:MouseEvent){
          mousePos.set(e.x,e.y)
          // console.log(mousePos)
        }
        function mouseup(e:MouseEvent){
          mousePos.set(e.x,e.y)
          mousePosUp = mousePos.clone()
          
        }
        function mousedown(e:MouseEvent){
          mousePos.set(e.x,e.y)
          mousePosDown = mousePos.clone()
        }

        class Work {
          p: Vec2 = new Vec2(0, 0)
          angle: number = -Math.PI/2
          speed: number = 4
          imgObj: string = bgImage1
          w: number = 200
          h: number = 300
          public maxSpeed: number = 5

          constructor(args: {
            p: Vec2
            angle: number 
            speed: number 
            imgObj: string
            w: number 
            h: number 
          }) {
            let def = {
              p:  new Vec2(0, 0),
              angle:  -Math.PI/2,
              speed:  4,
              imgObj: bgImage1,
              w: 200,
              h: 300
            }
            Object.assign(def, args);
            Object.assign(this, def);
          }
          draw(){
            let img = new Image()
            const w = this.w
            const h = this.h
            const v = (new Vec2(Math.cos(this.angle + scrollDistance),Math.sin(this.angle + scrollDistance))).mul(this.speed)
            const maxDistance = this.maxSpeed * this.speed
            const distance = Vec2.distance(this.p, this.p.add(v))
            if (distance > maxDistance) {
              v.length = maxDistance;
            }
            this.p = this.p.add(v)
            const x1 = this.p.x
            const y1 = this.p.y

            img.src = this.imgObj
            img.addEventListener("load",() => setInterval(draw, 12000), {once: true});
              ctx!.drawImage(img, x1, y1, w , h)

          }
        }
        function init(){
          works.push(new Work({
            p: new Vec2(1100,500),
            angle: 270,
            speed: 2,
            imgObj: shuffledImagesSquare.pop() as string,
            w:300,
            h:300
          }))
          
          works.push(new Work({
            p: new Vec2(800,350),
            angle: 70,
            speed:3,
            imgObj: shuffledImagesHeight.pop() as string,
            w:200,
            h:300
          }))
          
          works.push(new Work({
            p: new Vec2(700,500),
                angle: 110,
                speed:3,
                imgObj: bgImage8,
                w:400,
                h:200
          }))
          
          works.push(new Work({
            p: new Vec2(650,300),
            angle: 180,
            speed:3,
            imgObj: shuffledImagesHeight.pop() as string,
            w:200,
            h:300
          }))
          
          setTimeout(function(){
            works.push(
              new Work({
                p: new Vec2(1100,300),
                angle: 200,
                speed:3,
                imgObj: shuffledImagesSquare.pop() as string,
                w:300,
                h:300
            }))
          },2000)
          
          setTimeout(function(){
            works.push(new Work({
              p: new Vec2(800,350),
              angle: 70,
              speed:3,
              imgObj: shuffledImagesHeight.pop() as string,
              w:200,
              h:300
            }))
          },3000)

          setTimeout(function(){
            works.push(new Work({
              p: new Vec2(700,500),
              angle: 110,
              speed:3,
              imgObj: bgImage5,
              w:400,
              h:200
            }))
          },4000)

          setTimeout(function(){
            works.push(new Work({
              p: new Vec2(650,300),
              angle: 180,
              speed:3,
              imgObj: shuffledImagesWidth.pop() as string,
              w:400,
              h:300
            }))
          },5000)
        }

        const works:Work[] = [] 
        function draw() {
          //清空背景
          ctx!.setTransform(1,0,0,1,0,0)
          ctx!.clearRect(0, 0, ww, wh)

          time++
          
          const center = new Vec2(ww / 2, wh / 2);
          works.forEach((work) => {
            const distance = Vec2.distance(work.p, center);
            if (distance >= 1200) {
              return
            }
            work.draw()
          });
          
           //繪製滑鼠座標
          ctx!.save()
            ctx!.fillStyle="red"
            ctx!.beginPath()
            ctx!.globalAlpha = 0.4
            ctx!.arc(mousePos.x,mousePos.y,20,0,Math.PI*2)
            ctx!.fill()
          ctx?.restore()

          
          // for(var i=0;i<20;i++){
          //   let pos = i*100
          //   ctx!.moveTo(pos,0)
          //   ctx!.lineTo(pos,1500)
          //   ctx?.moveTo(0,pos)
          //   ctx?.lineTo(2000,pos)
          //   ctx!.strokeStyle = 'yellow'
          //   ctx!.stroke();
          // }
          // //-------------------------

          requestAnimationFrame(draw)
        }
        function loaded(){
          init()
          requestAnimationFrame(draw)
        }
        window.addEventListener("load",loaded)
        return () => {
          window.removeEventListener("scroll", handleScroll);
        }
      }
    },[])
    return <>
      <div className="flex">
        <canvas ref={canvasRef} width={ww} height={wh} className="object-cover w-screen h-screen border" />
        <div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] text-[16px] font-medium ">
          { gallaryCanvas ? <h1 className="animatecss animatecss-pulse animatecss-infinite">SCROLL TO EXPLORE</h1> 
          : <h1 
              className="animatecss animatecss-pulse animatecss-infinite cursor-pointer"
              onClick={()=>{go('/work')}}
              >
                CLICK TO EXPLORE
              </h1>
          }
          

        </div>
      </div>
      
    </>
    ;
  };

export default GallaryCanvas
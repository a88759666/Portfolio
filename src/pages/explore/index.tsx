

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



const GallaryCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const worksRef = useRef<Work[]>([]);
  let shuffledImagesRef = useRef<string[]>([]);
  
  //scroll
  const scrollDistanceRef = useRef<number>(0);
  
 
  // Initialize
  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }
    
    let time = 0 
    let scrollDistance = 0
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const bgColor = 'rgba(255,251,240)'
    const bgImages = [bgImage1,bgImage2,bgImage3,bgImage4,bgImage5,bgImage6,bgImage7,bgImage8,bgImage9,bgImage10,bgImage11,bgImage12]
    const shuffledImages = [...bgImages];
    shuffledImagesRef.current = shuffleArray(bgImages)
    // for (let i = shuffledImages.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [shuffledImages[i], shuffledImages[j]] = [
    //     shuffledImages[j],
    //     shuffledImages[i],
    //   ];
    // }
    // Set canvas dimensions
    canvas.width = ww;
    canvas.height = wh;

    // Initialize works
    initWorks();

    // Start animation
    requestRef.current = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      };
  }, []);
      const handleScroll = (e:any) => {
        scrollDistanceRef.current = window.scrollY;
        console.log(scrollDistanceRef)
        // console.log(scrollDistance)

        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));


        // scrollDistanceRef+=delta*10;
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

      
      function initWorks(){
        const works = worksRef.current;
        const shuffledImages = shuffledImagesRef.current;
        works.push(new Work({
          p: new Vec2(1100,500),
          angle: 270,
          speed: 2,
          imgObj: shuffledImages.pop() as string,
          w:300,
          h:300
        }))
        
        works.push(new Work({
          p: new Vec2(800,350),
          angle: 70,
          speed:3,
          imgObj: shuffledImages.pop() as string,
          w:200,
          h:300
        }))
        
        works.push(new Work({
          p: new Vec2(700,500),
              angle: 110,
              speed:3,
              imgObj: shuffledImages.pop() as string,
              w:400,
              h:200
        }))
        
        works.push(new Work({
          p: new Vec2(650,300),
          angle: 180,
          speed:3,
          imgObj: shuffledImages.pop() as string,
          w:200,
          h:300
        }))
        
        
        works.push(
          new Work({
            p: new Vec2(1100,300),
            angle: 200,
            speed:3,
            imgObj: shuffledImages.pop() as string,
            w:200,
            h:300
        }))
        
        setTimeout(createAdditionalWorks, 2000);
        setTimeout(createAdditionalWorks, 3000);
        setTimeout(createAdditionalWorks, 4000);
        setTimeout(createAdditionalWorks, 5000);
      }
      function createAdditionalWorks() {
        const works = worksRef.current;
        const shuffledImages = shuffledImagesRef.current;
    
        works.push(
          new Work({
            p: new Vec2(1100, 300),
            angle: 200,
            speed: 3,
            imgObj: shuffledImages.pop() as string,
            w: 200,
            h: 300,
          })
        )

        
        works.push(new Work({
          p: new Vec2(800,350),
          angle: 70,
          speed:3,
          imgObj: shuffledImages.pop() as string,
          w:200,
          h:300
        }))
    
      
        works.push(new Work({
          p: new Vec2(700,500),
          angle: 110,
          speed:3,
          imgObj: shuffledImages.pop() as string,
          w:400,
          h:200
        }))

        works.push(new Work({
          p: new Vec2(650,300),
          angle: 180,
          speed:3,
          imgObj: shuffledImages.pop() as string,
          w:200,
          h:300
        }))
        
      }
      const works:Work[] = [] 
      function draw() {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) {
          return;
        }
        //清空背景

        ctx!.setTransform(1,0,0,1,0,0)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // time++
        

        worksRef.current.forEach((work) => {
          work.draw(ctx);
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
        // //   在這裡繪製
        
        // Draw the image on a separate canvas layer
        // const imageLayer = document.createElement('canvas');
        // imageLayer.width = ww;
        // imageLayer.height = wh;
        // const imageCtx = imageLayer.getContext('2d')!  
        
        // var imgObj = new Image()
        // imgObj.src = bgImage1
        // imgObj.onload = function(){
          // imageCtx!.drawImage(imgObj, 200+time,400+time,200,300)
          // ctx!.clearRect(0,0,ww,wh)

           // Draw the filled rectangle on the main canvas
         
          // ctx!.save()
          //   works.forEach(work =>{
          //     work.draw()
          //   })
          // ctx?.restore()

          

          // Draw the image layer on the main canvas
          // ctx!.drawImage(imageLayer, 0, 0)
          
          
        //   requestAnimationFrame(draw)
        // }

       
        requestRef.current = requestAnimationFrame(draw)
      }
      
  
  return <canvas ref={canvasRef} className="border-4" />
};

export default GallaryCanvas
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
class Work {
p: Vec2;
angle: number;
speed: number;
imgObj: string;
w: number;
h: number;

constructor({
  p,
  angle,
  speed,
  imgObj,
  w,
  h,
}: {
  p: Vec2;
  angle: number;
  speed: number;
  imgObj: string;
  w: number;
  h: number;
}) {
  this.p = p;
  this.angle = angle;
  this.speed = speed;
  this.imgObj = imgObj;
  this.w = w;
  this.h = h;
}

draw(ctx: CanvasRenderingContext2D) {
  const { p, angle, speed, imgObj, w, h } = this;

  const img = new Image();
  img.src = imgObj;

  const { x, y } = p;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();

  const radians = (angle * Math.PI) / 180;
  this.p.x += Math.cos(radians) * speed;
  this.p.y += Math.sin(radians) * speed;
}
}

function shuffleArray(array: any[]) {
const shuffled = [...array];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
return shuffled;
}
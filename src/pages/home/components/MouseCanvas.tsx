import { useEffect, useRef } from "react";


type MouseProps = {children: React.ReactNode}




const MouseCanvas: React.FC = () => {
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
    
   
    // Initialize
    useEffect(()=>{
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        let ctx = canvasCtxRef.current
        let time = 0 
        const ww = canvasRef.current.width
        const wh = canvasRef.current.height
        

        
        
        //設置滑鼠
        let mousePos = new Vec2(0,0)
        let mousePosDown = new Vec2(0,0)
        let mousePosUp = new Vec2(0,0)

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
       
        function draw() {
          //清空背景
          ctx!.setTransform(1,0,0,1,0,0)
          ctx!.clearRect(0, 0, ww, wh)

          time++
           //繪製滑鼠座標
          ctx!.save()
            ctx!.fillStyle="red"
            ctx!.beginPath()
            ctx!.globalAlpha = 0.4
            ctx!.arc(mousePos.x,mousePos.y,20,0,Math.PI*2)
            ctx!.fill()
          ctx?.restore()

          

          requestAnimationFrame(draw)
        }
        function loaded(){
          requestAnimationFrame(draw)
        }
        window.addEventListener("load",loaded)
        return () => {
          window.removeEventListener("load",loaded);
        }
      }
    },[])
    return <>
        <canvas ref={canvasRef} width={ww} height={wh} className="object-cover w-screen h-screen border">
        </canvas>
    </>
    ;
};

export default MouseCanvas
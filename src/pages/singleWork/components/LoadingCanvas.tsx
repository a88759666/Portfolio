import { useEffect, useRef } from "react";

const LoadingCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
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
    const a = new Vec2(3,4)
    
   
    // Initialize
    useEffect(()=>{
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        let ctx = canvasCtxRef.current
        let time = 0 
        
        const ww = canvasRef.current.width
        const wh = canvasRef.current.height
        const bgColor = 'rgba(255,251,240)'
       
        function draw(){
          time++
          //清空背景
          ctx!.fillStyle=bgColor
          ctx!.fillRect(0,0,ww,wh)
          //-------------------------
          //   在這裡繪製
  
          ctx!.beginPath()
          for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(30*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.lineWidth=2
          ctx!.strokeStyle="black"
          
          ctx!.stroke()
          
          ctx!.beginPath()
          for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(20*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.lineWidth=2
          ctx!.strokeStyle="black"
          ctx!.stroke()

          ctx!.beginPath()
          for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(10*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.lineWidth=2
          ctx!.strokeStyle="black"
          ctx!.stroke()

          ctx!.beginPath()
          for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(-10*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.lineWidth=2
          ctx!.strokeStyle="black"
          ctx!.stroke()

          ctx!.beginPath()
          for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(-20*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.lineWidth=2
          ctx!.strokeStyle="black"
          ctx!.stroke()

          ctx!.beginPath()
           for(var i=0;i<wh;i++){
            let deg = i*0.04 + time/20
            ctx!.lineTo(-30*Math.cos(deg)+ww/2 ,i)
          }
          ctx!.stroke()

          
          requestAnimationFrame(draw)
        }
        requestAnimationFrame(draw)
      }
    },[])
    
    
    
    return <canvas ref={canvasRef} width="100" height="1000"></canvas>;
  };

export default LoadingCanvas
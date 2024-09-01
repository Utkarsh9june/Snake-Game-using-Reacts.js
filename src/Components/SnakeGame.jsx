import React, { useEffect, useRef, useState } from 'react'

const gridsize = 25;
const gamegrid = Array.from({length:gridsize},()=> new Array(gridsize).fill(""));

const food = () => {
  const x = Math.floor(Math.random() * gridsize);
  const y = Math.floor(Math.random() * gridsize);
  return [x,y]; 
}

const SnakeGame = () => {  
  
  const [snakeBody,setSnakeBody] = useState([[5,5],[6,5],[7,5]]);

  const directionRef = useRef([1,0]);
  const foodref = useRef(food());
  
  const isSnakeBodyDiv = (xc,yc) =>{
    return snakeBody.some(([x,y]) => {
      return x===xc && y===yc;
    });
  };

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setSnakeBody((prevSnakeBody)=>{
        const newHead = [prevSnakeBody[0][0]+directionRef.current[0],prevSnakeBody[0][1]+directionRef.current[1]];
        
        if(newHead[0]<0 || newHead[0]>=gridsize || newHead[1]<0 || newHead[1]>=gridsize || prevSnakeBody.some(([x,y]) => {
          return newHead[0] === x && newHead[1] === y;
        })){
          directionRef.current=[1,0];
          return [[5,5],[6,5],[7,5]];
        }
        const copySnakeBody = prevSnakeBody.map((arr)=>[...arr]);
        if(newHead[0] === foodref.current[0] && newHead[1] === foodref.current[1]){
          foodref.current = food();
        }else{
          copySnakeBody.pop();
        }
        copySnakeBody.unshift(newHead);
        return copySnakeBody;
      });
    },200);
    const handleDirection = (e) =>{
      const key = e.key;
      if(key==='ArrowUp' && directionRef.current[1]!==1){
        directionRef.current = [0,-1]
      }else if(key==='ArrowDown' && directionRef.current[1]!==-1){
        directionRef.current = [0,1];
      }else if(key==='ArrowLeft' && directionRef.current[0]!==1){
        directionRef.current = [-1,0];
      }else if(key==='ArrowRight' && directionRef.current[0]!==-1){
        directionRef.current = [1,0];
      }
    }
    window.addEventListener("keydown",handleDirection);
    return () =>{
      clearInterval(intervalId);
      window.removeEventListener('keydown',handleDirection);
    }
  },[]);

  return (
    <div className='container'>
      {gamegrid.map((row,yc) => {
        return row.map((col,xc) =>{
          return <div className={`cell ${isSnakeBodyDiv(xc,yc) ? "snake" : ""} ${foodref.current[0] === xc && foodref.current[1] === yc ? "food" : ""}`}></div>
        });
      })}
    </div>
  )
}

export default SnakeGame
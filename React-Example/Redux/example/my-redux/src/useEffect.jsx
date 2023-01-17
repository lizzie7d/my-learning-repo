import React, {useState,useEffect} from 'react';
import { useRef } from 'react';
const Counter = () => {
  const [count, setCount] = useState(0);
  const timeRef = useRef();
  useEffect(() => {

    //这样会导致每次都跟着重新渲染
    // const timer = setInterval(() => {
    //   setCount((c) => c + 1);
    // },9000);
    timeRef.current=setInterval(()=>{
      setCount((c)=>c+1)
    },5000)
    return()=>clearInterval(timeRef.current)
  },[]);
  return <div>{count}</div>;
};
export default Counter

import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true){

    const ref = useRef(); //ref to select dom elements
    
    useEffect(function() {
        
        function handleClick(e){
            if (ref.current && !ref.current.contains(e.target)) {
            handler()
          //  console.log("Click outside");
        //    close();
      }
       
    }

    document.addEventListener("click", handleClick, listenCapturing)
    
    
    return ()=> document.removeEventListener("click", handleClick, listenCapturing)
  }, [handler, listenCapturing])

  return ref;
  
}
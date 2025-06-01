import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import  {useOutsideClick}  from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//A react portal is a feature that helps us render a 
// element outside its parent's DOM structure while
//keeping the element on its original position on the component tree 
// (Has to do with styling in case the component is reused elsewhere). It helps keep tooltips, menus, modal on top of all other element.
//It prevents a situation of overflow-hidden by some parent element.

const ModalContext = createContext()


export default function Modal({children}) {
  const [openName, setOpenName] = useState("")

  const close = () => setOpenName("");
  const open = setOpenName; //a setter that would be called inside the tasks function

  return (
      <ModalContext.Provider value={{openName, close, open}}>
          {children}
      </ModalContext.Provider>)

}

function Open({children, opens: opensWindowName}){
    const {open} = useContext(ModalContext);
 
    return cloneElement(children, { onClick: () => open(opensWindowName)})
}
 

function Window({children, name}) {

  const {openName, close} = useContext(ModalContext)
  
  const ref = useOutsideClick(close)

  // const ref = useRef() //ref to select dom elements
  
  // useEffect(function() {

  //   function handleClick(e){
  //     if (ref.current && !ref.current.contains(e.target)) {
  //          console.log("Click outside");
  //          close();
  //     }
       
  //   }

  //   document.addEventListener("click", handleClick, true)
    
    
  //   return ()=> document.removeEventListener("click", handleClick, true)
  // }, [close])

    if(name !== openName) return null;

  return createPortal (
    
    <Overlay> 
      <StyledModal ref={ref}>
        <Button onClick={close}><HiXMark /></Button>
        <div>{cloneElement(children, {onCloseModal: close})}</div>
        {/* <div>
          {children}
        </div> */}
      </StyledModal>
    </Overlay>, document.body // dom note
  )
}


Modal.Open = Open;
Modal.Window = Window;
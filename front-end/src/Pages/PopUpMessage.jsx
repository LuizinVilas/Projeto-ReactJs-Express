import React, {useState, useEffect, useRef} from 'react'
import './PopUpMessage.css'



function PopUpMessage(props){
    const [ScreenSize, SetScreenSize] = useState({ width: window.innerWidth});
    const [DivWidth, SetDivWidth] = useState(0);
    const DivRef = useRef(0);


    function UpdateDivWidth(){
        SetScreenSize({ width: window.innerWidth});
        SetDivWidth(DivRef.current.getBoundingClientRect().width);
    }

    let Center = ScreenSize.width/2 - DivWidth/2;

    useEffect(() => {
        UpdateDivWidth();
        if(props.message != ''){
            document.getElementById('AnimatedPopUp').animate(
            [
                { top: '30%', opacity: 0 },       
                { top: '15%', opacity: 1 },
                { top: '15%', opacity: 1 },       
                { top: '30%', opacity: 0 }        
            ],
              {
                duration: 3500,                  
                easing: 'ease-in-out',                     
              }
            )
        }
    }, [props.message]);
    
    useEffect(() => {
        window.addEventListener('resize', UpdateDivWidth);
        return(() => {
            window.removeEventListener('resize', UpdateDivWidth);
        })
    }, [])
    
    return (
        <>
            <div className="PopUpMessage" id='AnimatedPopUp' ref={DivRef} style={{left: `${Center}px`}}>
                <h1>{props.message}</h1>
            </div>
        </>
    )
}

export default PopUpMessage
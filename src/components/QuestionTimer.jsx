import { useState, useEffect } from "react";
export default function QuestionTimer({timeout, onTimeout}) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(()=>{
        console.log("SETTING OUT")
        const timer = setTimeout(onTimeout, timeout);

        return(()=>{
            clearTimeout(timer)
        })
    },[timeout, onTimeout]);

    useEffect(()=>{
        console.log("SETTING Interval")
        const interval = setInterval(()=>{
            setRemainingTime((prevRemainigTime) => prevRemainigTime -100);
        }, 100)

        return(() => {
            clearInterval(interval)
        })
    }, [])

    return <progress max={timeout} value={remainingTime} className="w-full mx-auto rounded-lg"  />
}

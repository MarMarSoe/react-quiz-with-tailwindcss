import { useState } from "react";

import QUESTION from "../questions.js";
import quizCompleteLogo from "../assets/quiz-complete.png";

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
   
    const quizIsComplete = activeQuestionIndex === QUESTION.length

    const handleSelectorAnswer = (selectedAnswer) =>{
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }

    if(quizIsComplete) {
        return(
            <div class="max-w-sm mx-auto p-6 bg-purple-400 rounded-sm ">
            <img src={quizCompleteLogo} alt="quizCompleteLogo" class="h-20 w-20 mx-auto pt-2 rounded-full"/>
            <h1 class="text-black text-center font-bold ">React Quiz Complete</h1>
    </div>
        )
        
    }

    const shuffleAnswers = [...QUESTION[activeQuestionIndex].answers]
    shuffleAnswers.sort(()=> Math.random() - 0.5)

    return (
        <div id="quiz" class="flex justify-center">
            <div class="p-6 bg-purple-600 rounded-md">
            <h2 class="text-white font-semibold">{QUESTION[activeQuestionIndex].text}</h2>
            <ul id="answers" class="py-1">
                {shuffleAnswers.map((answer)=>(
                    <li key="answer">
                        <button class="text-center my-3 p-3 rounded-full text-black bg-slate-300 font-semibold hover:text-white hover:bg-slate-600" onClick={() => handleSelectorAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    )
}

export default Quiz;



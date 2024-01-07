import { useState, useCallback, useRef } from "react";
import QUESTION from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteLogo from "../assets/quiz-complete.png";
import "./Quiz.module.css"

const Quiz = () => {

    const shuffleAnswers = useRef();
    const [answerSate, setAnswerState] = useState('');

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerSate === '' ? userAnswers.length : userAnswers.length-1;
   
    const quizIsComplete = activeQuestionIndex === QUESTION.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer){

        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });

        setTimeout(()=> {
            if(selectedAnswer === QUESTION[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(()=>{
                setAnswerState('')
            }, 2000);
    }, 1000);

    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), []);

    if(quizIsComplete) {
        return(
            <div className="max-w-sm mx-auto p-6 bg-purple-400 rounded-sm ">
            <img src={quizCompleteLogo} alt="quizCompleteLogo" class="h-20 w-20 mx-auto pt-2 rounded-full"/>
            <h1 className="text-black text-center font-bold ">React Quiz Complete</h1>
    </div>
        )
    }

    if(!shuffleAnswers.current){
        shuffleAnswers.current = [...QUESTION[activeQuestionIndex].answers]
        shuffleAnswers.current.sort(()=> Math.random() - 0.5)
    }
   

    return (
        <div id="quiz" class="flex justify-center">
            <div class="p-6 bg-purple-600 rounded-md">
            <QuestionTimer  key={activeQuestionIndex} timeout={10000} onTimeout={()=> handleSelectAnswer(null)}/>
            <h2 class="text-white font-semibold">{QUESTION[activeQuestionIndex].text}</h2>
            <ul id="answers" class="py-1">
                {shuffleAnswers.current.map((answer)=>{
                    const isSelected = userAnswers[userAnswers.length -1] === answer;
                    let cssClass = '';

                    if(answerSate === 'answered' && isSelected){
                        cssClass = 'selected'
                    }

                    if((answerSate === 'correct' || answerSate === 'wrong') && isSelected){
                        cssClass = answerSate
                    }

                    return(
                        <li key={answer}>
                        <button className="${cssClass} w-full text-center my-3 p-3 rounded-full text-black bg-slate-300 font-semibold hover:text-white hover:bg-slate-600"
                        onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                    )
                }
                )}
            </ul>
        </div>
        </div>
    )
}

export default Quiz;



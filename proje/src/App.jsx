import React from "react";
import './index.css'
import { useState } from "react";
import { useEffect } from "react";

const questions = [
  {
    questionsText: "The capital of Australia is Sydney.",
    answerOptions: [
      { answerText: "Yes", isCorrect: false },
      { answerText: "No", isCorrect: true },
    ],
  },
  {
    questionsText: "The Great Wall of China is visible from space.",
    answerOptions: [
      { answerText: "Yes", isCorrect: true },
      { answerText: "No", isCorrect: false },
    ],
  },
  {
    questionsText: "The capital of Turkey is Ankara.",
    answerOptions: [
      { answerText: "Yes", isCorrect: true },
      { answerText: "No", isCorrect: false },
    ],
  },
  {
    questionsText: "Sharks are mammals.",
    answerOptions: [
      { answerText: "Yes", isCorrect: false },
      { answerText: "No", isCorrect: true },
    ],
  },
  {
    questionsText: "Mount Everest is the highest mountain in the world.",
    answerOptions: [
      { answerText: "Yes", isCorrect: true },
      { answerText: "No", isCorrect: false },
    ],
  },
   {
    questionsText: "Mount Everest is the highest mountain in the world.",
    answerOptions: [
      { answerText: "Yes", isCorrect: true },
      { answerText: "No", isCorrect: false },
    ],
  },
];

function App() {

  const [started, setStarted] = useState(false);
  const [currectQuestion, setcurrentQuestion] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const[timeleft, setTimeLeft] = useState(5)

  useEffect(() => {
    if (!started || showResult || answered) return;

    if(timeleft==0){
      autoMoveNext();
      return;
    }
    const timer = setTimeout(()=> {
      setTimeLeft(timeleft-1);
    }, 1000);
    return()=> clearTimeout(timer);
  }, [timeleft,started,answered,showResult])

   const autoMoveNext = () => {
    setAnswered(true);
    setTimeout(() =>{
        const next = currectQuestion + 1;
      if (next < questions.length) {
        setcurrentQuestion(next);
        setSelectedIndex(null);
        setAnswered(false);
        setTimeLeft(5);
      } else {
        setShowResult(true);
      }    
    }, 1000)
   }
  

  const handleAnswer = (isCorrect, index) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const next = currectQuestion + 1;
      if (next < questions.length) {
        setcurrentQuestion(next);
        setSelectedIndex(null);
        setAnswered(false);
        setTimeLeft(5);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

    const handleStart = () => {
    setStarted(true);
    setTimeLeft(5);

  };

  return (
    <div className="flex-center-screen">
      <div className="quiz-container">
        {!started ? (
          <div className="text-center">
        <h1 className="quiz-title">Welcome to the Quiz!</h1>
            <button className="quiz-button" onClick={handleStart}>
              Start Quiz
            </button>
          </div>
        ):showResult ? (
          <div className="text-center"> 
            <h2>Test Tamamlandı</h2>
            <p> 
              Başarı: <strong>{Math.round((score / questions.length) * 100)}%</strong>
            </p>
            <p>
              Doğru Sayısı: <strong>{score} / {questions.length}</strong>
            </p>
          </div>
        ) : (
          <div>
            <div className="question-header">
              <div className="question-text">
                {questions[currectQuestion].questionsText}
              </div>
              <div className="timer">{timeleft} saniye</div>
            </div>
            {questions[currectQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                className={`quiz-input ${answered ? option.isCorrect ? "correct": selectedIndex === index? "wrong": "": ""}`}
                
                disabled={answered}
                onClick={() => handleAnswer(option.isCorrect, index)}
              >
                {option.answerText}
              </button>
            ))}
            <p className="quiz-progress">
              Question {currectQuestion + 1} of {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App

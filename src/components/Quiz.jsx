import { useSelector, useDispatch } from 'react-redux';
import { updateUserAnswer, updateUserScore, submitAnswers } from '../redux/examSlice';
import { useState } from 'react';
import Dialog from './dialog';
const Quiz = () => {
  const dispatch = useDispatch();
  const examData = useSelector((state) => state.exam.data);
  const userAnswers = useSelector((state) => state.exam.userAnswers);
  const userScore = useSelector((state) => state.exam.userScore);
  const submitted = useSelector((state) => state.exam.submitted);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    dispatch(updateUserAnswer({ questionIndex, answerIndex }));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    dispatch(updateUserScore(score));
    document.getElementById('submitted').showModal();
  };

  

  const calculateScore = () => {
    let score = 0;
    examData.questions.forEach((question, questionIndex) => {
      const correctAnswerIndex = question.correct_choice - 1;
      const userAnswerIndex = userAnswers[questionIndex];

      if (userAnswerIndex === correctAnswerIndex) {
        score += question.degree;
      }
    });
    return score;
  };

  return (
    <>
     {examData.questions.map((question, questionIndex) => (
      <div
      key={questionIndex}
      className={`card bg-slate-50 w-1/2 m-10 p-5 shadow-2xl ease-in-out scroll-smooth hover:shadow-md duration-300 ${
        submitted && userAnswers[questionIndex] === question.correct_choice - 1
          ? 'ring ring-green-400'
          : submitted && userAnswers[questionIndex] !== question.correct_choice - 1
          ? 'ring ring-red-400'
          : ''
      }`}
    >
        <p className="mx-10 font-bold text-xl">{question.question}</p>
        <div className="divider">
          <span className='badge badge-primary text-xl badge-lg p-5 font-semibold'>{questionIndex + 1}</span>
        </div>
        <div className="space-y-2 card-body">
          {question.choices.map((choice, choiceIndex) => (
            <label key={choiceIndex} className={"label ease-in-out cursor-pointer rounded-lg hover:bg-slate-200 "}>
              <span className="text-md">{choice}</span>
              <input
                type="radio"
                name={`radio-${questionIndex}`}
                className="radio checked:bg-indigo-700"
                checked={userAnswers[questionIndex] === choiceIndex}
                onChange={() => handleAnswerSelect(questionIndex, choiceIndex)}
              />
            </label>
          ))}
        </div>
        {submitted && (
          <div className="text-green-400 font-bold mt-2">
            Correct Answer: {question.choices[question.correct_choice - 1]}
          </div>
        )}
      </div>
    ))}
    <button onClick={() => { dispatch(submitAnswers()); handleSubmit(); }} className="btn btn-active btn-primary m-20 w-1/4">
      Submit Answers
    </button>
    <Dialog id="submitted" className="modal" score={userScore} />
    </>
  );
};

export default Quiz;

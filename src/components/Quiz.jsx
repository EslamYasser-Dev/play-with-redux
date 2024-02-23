// QuizComponent.js
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAnswer, updateUserScore } from "../redux/examSlice"
const Quiz = () => {
  const dispatch = useDispatch();
  const examData = useSelector((state) => state.exam.data);
  const userAnswers = useSelector((state) => state.exam.userAnswers);
  const userScore = useSelector((state) => state.exam.userScore);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    console.log('Answer selected:', questionIndex, answerIndex);
    dispatch(updateUserAnswer({ questionIndex, answerIndex }));
  };
  const handleSubmit = () => {
    const score = calculateScore();
    dispatch(updateUserScore(score));
    dispatch(updateUserAnswer({}));
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
        <div key={questionIndex} className="card bg-slate-50 w-1/2 m-10 p-5 shadow-2xl">

          <p className="mx-10 font-bold text-xl">{question.question}</p>
          <div className="divider">           <span className='badge badge-primary text-xl badge-lg font-bold'>{questionIndex + 1}</span>
          </div>
          <div className="space-y-2 card-body">
            {question.choices.map((choice, choiceIndex) => (
              <label key={choiceIndex} className="label cursor-pointer">
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
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-active btn-primary">Submit Answers</button>
      <p>User Score: {userScore}</p>
    </>
  );
};


export default Quiz;

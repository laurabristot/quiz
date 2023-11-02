import { useQuiz } from '../context/QuizContext'

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz()
  if (answer === null) return null

  const isLast = index === numQuestions - 1

  function handleNext() {
    if (isLast) {
      dispatch({ type: 'finished' })
    } else {
      dispatch({ type: 'nextQuestion' })
    }
  }

  return (
    <button className="btn btn-ui" onClick={handleNext}>
      {isLast ? 'Finish' : 'Next'}
    </button>
  )
}

export default function NextButton({ dispatch, answer, index, numQuestions }) {
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

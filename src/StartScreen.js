export default function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>
        {numQuestions} question{numQuestions > 1 && 's'} to test your react
        mastery
      </h3>
      <button className="btn btn-ui">Let's start!</button>
    </div>
  )
}
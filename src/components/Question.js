import { Options } from './index.js'

export default function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  )
}

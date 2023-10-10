import { useEffect, useReducer } from 'react'
import * as C from './components'

import './index.css'

const inicialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return {
        ...inicialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch
  ] = useReducer(reducer, inicialState)
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

  useEffect(() => {
    fetch('https://tlv879-8000.csb.app/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <C.Header />

      <C.Main>
        {status === 'loading' && <C.Loader />}
        {status === 'error' && <C.Error />}
        {status === 'ready' && (
          <C.StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <C.Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <C.Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <C.Footer>
              <C.Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <C.NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </C.Footer>
          </>
        )}
        {status === 'finished' && (
          <C.FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </C.Main>
    </div>
  )
}

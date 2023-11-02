import * as C from './components'

import { useQuiz } from './context/QuizContext'
import './index.css'

export default function App() {
  const { status } = useQuiz()

  return (
    <div className="app">
      <C.Header />

      <C.Main>
        {status === 'loading' && <C.Loader />}
        {status === 'error' && <C.Error />}
        {status === 'ready' && <C.StartScreen />}
        {status === 'active' && (
          <>
            <C.Progress />
            <C.Question />
            <C.Footer>
              <C.Timer />
              <C.NextButton />
            </C.Footer>
          </>
        )}
        {status === 'finished' && <C.FinishScreen />}
      </C.Main>
    </div>
  )
}

import './global.css'
import styles from './App.module.css'
import { Header } from './components/Header'
import { Content } from './components/Content'

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Content />
      </div>
    </div>
  )
}

export default App

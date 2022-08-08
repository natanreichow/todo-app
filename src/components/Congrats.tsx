import styles from './Congrats.module.css'
import { CircleWavyCheck } from 'phosphor-react'

export function Congrats() {
  return (
    <div className={styles.congrats}>
      <CircleWavyCheck size={64} color={'#4BF21C'} />
      <strong>Congratulations!</strong>
      <p>You have completed all your tasks</p>
    </div>
  )
}
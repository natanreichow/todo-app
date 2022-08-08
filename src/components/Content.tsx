import styles from './Content.module.css'
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, useState, ChangeEvent } from 'react'
import { Emptylist } from './EmptyList'


export interface ContentProps {
  id: string,
  title: string,
  isComplete: boolean,
}

export function Content() {

  const [tasks, setTasks] = useState<ContentProps[]>([])

  const [newTaskText, setNewTaskText] = useState('')
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: uuidv4(),
      title: newTaskText,
      isComplete: false
    }
  
    setTasks([...tasks, newTask]);
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }

  function handleToggleCompleteTask(id: string) {
    const editedTasks = tasks.map(task => {
      if (task.id == id) {
        return {
          ...tasks,
          isComplete: !task.isComplete
        }
      }

      return task
    })
    
    setTasks(editedTasks)
  }

  function countCompleteTasks() {
    let count = 0

    tasks.forEach(task => {
      if (task.isComplete == true) {
        count = count + 1
      }
    })
    return count
  }

  const isNewTaskEmpty = newTaskText.length == 0;

  const numberOfTasks = tasks.length

  const numberOfCompleteTasks = countCompleteTasks()

  return (
    <div className={styles.content}>
      <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
        <input 
          placeholder='Add a new task'
          value={newTaskText}
          onChange={handleNewTaskChange}
        />
          <button type='submit' disabled={isNewTaskEmpty}>
           Add <PlusCircle size={18}/>
         </button>
      </form>
      <div className={styles.title}>
        <div className={styles.createdTasks}>
          <p>Created tasks</p><span>{numberOfTasks}</span>
        </div>

        <div className={styles.completedTasks}>
          <p>Completed</p><span>{numberOfCompleteTasks} from {numberOfTasks}</span>
        </div>
      </div>

      <div>
        {numberOfTasks == 0
        ? <Emptylist />
        : tasks.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              isComplete={task.isComplete}
              onDeleteTask={deleteTask}
              onHandleToggle={handleToggleCompleteTask}
            />
          )
        })
        }
      </div>
    </div>

  )
}
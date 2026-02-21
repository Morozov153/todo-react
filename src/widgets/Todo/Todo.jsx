import { useContext } from 'react'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import ToDoList from '@/entities/todo/ui/ToDoList'
import Button from '@/shared/ui/Button'
import { TasksContext } from '@/entities/todo'
import styles from './Todo.module.scss'

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext)

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>Список задач</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        Показать первую задачу
      </Button>
      <ToDoList styles={styles} />
    </div>
  )
}

export default Todo
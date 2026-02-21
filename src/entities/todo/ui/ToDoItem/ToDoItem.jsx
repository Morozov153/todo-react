import { memo, useContext } from 'react'
import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'
import styles from './TodoItem.module.scss'
import { highlightCaseInsensitive } from '../../../../shared/utils/highlight'

const TodoItem = ({ className = '', id, title, isDone }) => {
  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery,
  } = useContext(TasksContext)

  const highlightedTitle = highlightCaseInsensitive(title,searchQuery)
  const domId = String(id)

  return (
    <li
      className={[
        styles.todoItem,
        className,
        disappearingTaskId === id ? styles.isDisappearing : '',
        appearingTaskId === id ? styles.isAppearing : '',
      ].join(' ').trim()}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={domId}
        type="checkbox"
        checked={isDone}
        onChange={(e) => toggleTaskComplete(id, e.target.checked)}
      />

      <label className={`${styles.label} visually-hidden`} htmlFor={domId}>
        {title}
      </label>

      <RouterLink to={`tasks/${id}`} aria-label="Task detail page">
        <span dangerouslySetInnerHTML={{__html: highlightedTitle}}></span>
      </RouterLink>

      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Удалить"
        type="button"
        onClick={() => deleteTask(id)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  )
}

export default memo(TodoItem)

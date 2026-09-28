import { useState } from 'react'

const CATEGORY_CLASS = {
  Work: 'badge badge--work',
  Personal: 'badge badge--personal',
  Urgent: 'badge badge--urgent',
  Other: 'badge badge--other',
}

function TaskItem({ task, onToggleComplete, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)

  function handleSaveEdit(event) {
    event.preventDefault()
    const trimmed = draftText.trim()
    if (!trimmed) return
    onEditTask(task.id, trimmed)
    setIsEditing(false)
  }

  function handleCancelEdit() {
    setDraftText(task.text)
    setIsEditing(false)
  }

  const isOverdue = false // reserved for stretch-goal due-date feature

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <input
        type="checkbox"
        className="task-item__checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'complete'}`}
      />

      {isEditing ? (
        <form className="task-item__edit-form" onSubmit={handleSaveEdit}>
          <input
            type="text"
            className="task-item__edit-input"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            autoFocus
          />
          <button type="submit" className="task-item__save-btn">
            Save
          </button>
          <button type="button" className="task-item__cancel-btn" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="task-item__content">
            <span className="task-item__text">{task.text}</span>
            <span className={CATEGORY_CLASS[task.category] || 'badge'}>{task.category}</span>
          </div>

          <div className="task-item__actions">
            <button
              type="button"
              className="task-item__edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="task-item__delete-btn"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem

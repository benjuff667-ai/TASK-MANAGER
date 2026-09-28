import { useState } from 'react'

const CATEGORIES = ['Work', 'Personal', 'Urgent', 'Other']


function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('Work')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmed = text.trim()
    if (!trimmed) {
      setError('Please enter a task description.')
      return
    }

    onAddTask({
      id: crypto.randomUUID(),
      text: trimmed,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    })

    setText('')
    setCategory('Work')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          type="text"
          className="task-form__input"
          placeholder="What do you need to do?"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            if (error) setError('')
          }}
          aria-label="Task description"
        />

        <select
          className="task-form__select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Task category"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit" className="task-form__button">
          Add Task
        </button>
      </div>

      {error && <p className="task-form__error">{error}</p>}
    </form>
  )
}

export default TaskForm

import { useState, useEffect, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import TaskForm from './Components/TaskForm.jsx'
import TaskFilter from './Components/TaskFilter.jsx'
import TaskList from './Components/TaskList.jsx'
import TaskStats from './Components/TaskStats.jsx'
import './App.css'

function App() {
  // Tasks are persisted to localStorage via the custom hook.
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', [])

  // UI-only state — does not need to persist across page loads,
  // except theme, which we also persist for a nicer UX (stretch goal).
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [theme, setTheme] = useLocalStorage('taskflow-theme', 'light')

  // Sync the chosen theme onto the <html> element whenever it changes.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function handleAddTask(newTask) {
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  function handleToggleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  function handleEditTask(id, newText) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }

  // Recompute the visible list only when its dependencies change.
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && !task.completed) ||
        (statusFilter === 'Completed' && task.completed)

      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter

      return matchesStatus && matchesCategory
    })
  }, [tasks, statusFilter, categoryFilter])

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>TaskFlow</h1>
          <p>Your personal task manager — stays saved right in this browser.</p>
        </div>
        <button
          type="button"
          className="app__theme-toggle"
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle dark and light theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="app__main">
        <TaskForm onAddTask={handleAddTask} />

        <TaskStats tasks={tasks} />

        <TaskFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <TaskList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>

      <footer className="app__footer">
        <p>Built with React · Data persists via localStorage</p>
      </footer>
    </div>
  )
}

export default App

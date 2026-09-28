function TaskStats({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const remaining = total - completed

  return (
    <div className="task-stats">
      <span>
        <strong>{total}</strong> total
      </span>
      <span>
        <strong>{remaining}</strong> remaining
      </span>
      <span>
        <strong>{completed}</strong> completed
      </span>
    </div>
  )
}

export default TaskStats

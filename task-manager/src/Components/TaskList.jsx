import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p>No tasks here. 🎉</p>
        <span>Try adding a new task or changing your filters.</span>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  )
}

export default TaskList

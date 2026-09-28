const STATUS_OPTIONS = ['All', 'Active', 'Completed']
const CATEGORY_OPTIONS = ['All', 'Work', 'Personal', 'Urgent', 'Other']


function TaskFilter({ statusFilter, setStatusFilter, categoryFilter, setCategoryFilter }) {
  return (
    <div className="task-filter">
      <div className="task-filter__status">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            className={`task-filter__btn ${statusFilter === status ? 'task-filter__btn--active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <select
        className="task-filter__category-select"
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        aria-label="Filter by category"
      >
        {CATEGORY_OPTIONS.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'All' ? 'All Categories' : cat}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TaskFilter

export function TodoItem({ todo, onToggle, onDelete, disabled }) {
  return (
    <li className={`todo-item${todo.done ? ' todo-item--done' : ''}`}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          disabled={disabled}
          aria-label={`Mark "${todo.text}" as ${todo.done ? 'incomplete' : 'complete'}`}
        />
        <span className="todo-item__text">{todo.text}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        disabled={disabled}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}

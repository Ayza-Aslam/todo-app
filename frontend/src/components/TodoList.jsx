import { TodoItem } from './TodoItem';

export function TodoList({ todos, onToggle, onDelete, disabled }) {
  if (todos.length === 0) {
    return <p className="todo-list__empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </ul>
  );
}

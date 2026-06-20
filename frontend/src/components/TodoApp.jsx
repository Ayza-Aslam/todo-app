import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { StatusMessage } from './StatusMessage';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export function TodoApp() {
  const { todos, loading, error, actionError, addTodo, toggleTodo, removeTodo, reload } =
    useTodos();
  const [submitting, setSubmitting] = useState(false);

  const handleAddTodo = async (text) => {
    setSubmitting(true);
    await addTodo(text);
    setSubmitting(false);
  };

  const busy = loading || submitting;

  return (
    <main className="todo-app">
      <header className="todo-app__header">
        <h1>My Todo App</h1>
        <p className="todo-app__subtitle">Stay organized, one task at a time.</p>
      </header>

      <StatusMessage message={error} onRetry={reload} />
      <StatusMessage message={actionError} type="warning" />

      <TodoForm onSubmit={handleAddTodo} disabled={busy || Boolean(error)} />

      {loading ? (
        <p className="todo-app__loading" aria-live="polite">
          Loading tasks...
        </p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={removeTodo}
          disabled={submitting}
        />
      )}
    </main>
  );
}

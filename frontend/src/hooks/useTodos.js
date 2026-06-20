import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '../services/api';
import * as todosApi from '../services/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await todosApi.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (text) => {
    setActionError(null);

    try {
      const newTodo = await todosApi.createTodo(text);
      setTodos((prev) => [...prev, newTodo]);
      return true;
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to add todo');
      return false;
    }
  };

  const toggleTodo = async (id) => {
    setActionError(null);

    try {
      const updated = await todosApi.toggleTodo(id);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to update todo');
    }
  };

  const removeTodo = async (id) => {
    setActionError(null);

    try {
      await todosApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to delete todo');
    }
  };

  return {
    todos,
    loading,
    error,
    actionError,
    addTodo,
    toggleTodo,
    removeTodo,
    reload: loadTodos,
  };
}

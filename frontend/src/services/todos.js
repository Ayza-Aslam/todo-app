import { apiRequest } from './api';

export function fetchTodos() {
  return apiRequest('/todos');
}

export function createTodo(text) {
  return apiRequest('/todos', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

export function toggleTodo(id) {
  return apiRequest(`/todos/${id}`, {
    method: 'PUT',
  });
}

export function deleteTodo(id) {
  return apiRequest(`/todos/${id}`, {
    method: 'DELETE',
  });
}

import { useState, useEffect } from 'react'

const API = 'http://localhost:3004'
//const API = 'https://todo-app-production-5017.up.railway.app'

function App() {
const [todos, setTodos] = useState([])
const [text, setText] = useState('')

useEffect(() => {
fetch(`${API}/todos`)
.then(res => res.json())
.then(data => setTodos(data))

}, [])

const addTodo = () => {
if (!text.trim()) return

fetch(`${API}/todos`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text })
})
.then(res => res.json())
.then(newTodo => {
setTodos(prev => [...prev, newTodo])
setText('')
})
}

const toggleTodo = (id) => {
fetch(`${API}/todos/${id}`, {
method: 'PUT'
})
.then(res => res.json())
.then(updated => {
setTodos(prev => prev.map(t => t.id === id ? updated : t))
})
}

const deleteTodo = (id) => {
fetch(`${API}/todos/${id}`, {
method: 'DELETE'
})
.then(() => {
setTodos(prev => prev.filter(t => t.id !== id))
})
}

return (
<div
style={{
maxWidth: '500px',
margin: '50px auto',
fontFamily: 'Arial'
}}
>
My Todo App

<div
style={{
display: 'flex',
gap: '8px',
marginBottom: '20px'
}}
>
<input
value={text}
onChange={e => setText(e.target.value)}
onKeyDown={e => e.key === 'Enter' && addTodo()}
placeholder="Write a task..."
style={{
flex: 1,
padding: '8px',
fontSize: '16px'
}}
/>

<button
onClick={addTodo}
style={{
padding: '8px 16px',
fontSize: '16px'
}}
>
Add
</button>
</div>

{todos.map(todo => (
<div
key={todo.id}
style={{
display: 'flex',
alignItems: 'center',
gap: '10px',
padding: '10px',
marginBottom: '8px',
border: '1px solid #ddd',
borderRadius: '6px'
}}
>
<input
type="checkbox"
checked={todo.done}
onChange={() => toggleTodo(todo.id)}
/>

<span
style={{
flex: 1,
textDecoration: todo.done ? 'line-through' : 'none',
color: todo.done ? '#aaa' : '#000'
}}
>
{todo.text}
</span>

<button
onClick={() => deleteTodo(todo.id)}
style={{ color: 'red' }}
>
Delete
</button>
</div>
))}
</div>
)
}

export default App
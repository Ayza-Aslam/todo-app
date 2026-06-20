export function TodoForm({ onSubmit, disabled }) {
  return (
    <form
      className="todo-form"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const text = formData.get('text');

        if (typeof text === 'string' && text.trim()) {
          onSubmit(text.trim());
          event.currentTarget.reset();
        }
      }}
    >
      <input
        name="text"
        type="text"
        maxLength={255}
        placeholder="Write a task..."
        autoComplete="off"
        disabled={disabled}
        aria-label="New todo"
      />
      <button type="submit" disabled={disabled}>
        Add
      </button>
    </form>
  );
}

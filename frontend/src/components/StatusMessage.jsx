export function StatusMessage({ message, type = 'error', onRetry }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`status-message status-message--${type}`} role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="status-message__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

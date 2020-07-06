export const Loader = ({ message, inline }) => {
  return (
    <div className={`ui-loader ${inline ? 'ui-loader-inline' : ''}`}>
      <div className="ui-loader-spinner"></div>
      {message && <div className="ui-loader-message">{message}</div>}
    </div>
  )
}

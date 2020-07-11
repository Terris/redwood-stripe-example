export const Loader = ({ message, type }) => {
  const typeClasses = {
    INLINE: 'ui-loader-inline',
    BLOCK: 'ui-loader-block',
  }
  return (
    <div className={`ui-loader ${typeClasses[type]}`}>
      <div className="ui-loader-spinner"></div>
      {message && <div className="ui-loader-message">{message}</div>}
    </div>
  )
}

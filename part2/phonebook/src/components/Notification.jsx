export const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }
  const classes = type === "error" ? "notification error" : "notification default";
  return <div className={classes}>{message}</div>
}
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const counter = useNotificationValue()

  return (
    <div style={style}>
      {counter}
    </div>
  )
}

export default Notification

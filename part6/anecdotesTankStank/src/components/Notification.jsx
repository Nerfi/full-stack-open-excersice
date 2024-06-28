import React from 'react'

export default function Notification({notification}) {

  console.log(notification, "in compoonentn")
  return (
    <div>Notification "{notification}" has been voted</div>
  )
}

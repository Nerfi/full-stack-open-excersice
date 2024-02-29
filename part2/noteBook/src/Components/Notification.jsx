import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={"error-" +isError}>
        {message}
      </div>
    )
  }

export default  Notification;

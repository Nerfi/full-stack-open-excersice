import { createContext, useReducer } from "react";

//creando el reducer para las notificaciones

const notifReducer = (state, action) => {
  //maybe change the state
  switch (action.type) {
    case "add":
     return !state
    
    case "vote":
        return {
            estado: !state,
            notif: action.payload
        }

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notif, dispatch] = useReducer(notifReducer, false);

  return (
    <NotificationContext.Provider value={[notif, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

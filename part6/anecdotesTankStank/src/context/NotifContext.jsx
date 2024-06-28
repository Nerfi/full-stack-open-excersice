import { createContext, useReducer, useEffect } from "react";

//creando el reducer para las notificaciones

const notifReducer = (state, action) => {
  //maybe change the state
  switch (action.type) {
    case "add":
      return {
        ...state,
        estado: !state.estado
      }

    case "vote":
      return {
        //...state,
        estado: !state?.estado,
        notif: action.payload,
      };

    case "restore":
      return {
        ...state,
        estado: false,
      };
      
      case "error":
        return {
          ...state,
          estado: true,
          notif: action.payload
        }

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const initialState = {
    estado: false, // Estado inicial.
    notif: null, // Notificación inicial.
  };
  const [notif, dispatch] = useReducer(notifReducer, initialState);

  //not really sure how this will play but we leave it for now
  useEffect(() => {
    if (notif.estado) {
      const timerForNotification = setTimeout(() => {
        dispatch({ type: "restore" });
      }, 3000);
      return () => clearTimeout(timerForNotification);
    }
  }, [notif?.estado]);

  return (
    <NotificationContext.Provider value={[notif, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

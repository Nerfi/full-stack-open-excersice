import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
/*
 La función que crea el componente está envuelta dentro de una llamada a la función forwardRef.
 De esta manera el componente puede acceder a la referencia que le fue asignada.
 */
/*
El componente usa el hook useImperativeHandle para que 
su función toggleVisibility esté disponible fuera del componente.
*/
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id="toggable">
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});
export default Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

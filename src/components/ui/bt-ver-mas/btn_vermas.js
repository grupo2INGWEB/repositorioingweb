import React from 'react'
import { useHistory } from "react-router-dom"
import './btn_vermas.css';
function BtnVerMas({ nombre, url, state }) {
  const history = useHistory();
  return (
    <div
      className="w-100 text-center pt-4"
      id="scrollspyHeading2"
      onClickCapture={() => {
        history.push(url, state);
        window.scroll({
          top: 0
        });
      }}
    >
      <div className="col-lg-2 mx-auto p-2 ver-mas" role="button">
        <div className="row justify-content-center ver-mas-content">
          <div className="col-8 text-center">{nombre}</div>
          <div className="col-2 text-center">
            <i className="material-icons">keyboard_arrow_right</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BtnVerMas


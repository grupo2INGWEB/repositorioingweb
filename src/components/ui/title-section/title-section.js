import React from 'react';
import './titleSection.css';
import { useHistory } from "react-router-dom"

const TitleSection = ({ nombre, url, state }) => {
    const history = useHistory();
    return (
        <div className="title-section">
            <div className="container-row-between">
                <h3 className="title">{nombre}</h3>
                <div className="btn-verMas" onClickCapture={() => {
                    history.push(url, state);
                    window.scroll({
                        top: 0
                    })
                }
                }>
                    <p>Ver más</p>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <hr className="separador" />

        </div>
    );
}

export default TitleSection;
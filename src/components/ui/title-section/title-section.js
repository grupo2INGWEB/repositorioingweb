import React from 'react';
import './titleSection.css';

const TitleSection = ({nombre}) => {
    return (
        <div className="title-section">
            <div className="container-row-between">
                <h3 className="title">{nombre}</h3>
                <div className="btn-verMas">
                    <p>Ver más</p>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <hr className="separador" />

        </div>
    );
}

export default TitleSection;
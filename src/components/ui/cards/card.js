import React from 'react';
import { Link } from "react-router-dom"

const Card = () => {
    return (
        <div className="card">
            <div className="title">
                <h4>Título del Recurso</h4>
                <p><i class="fas fa-heart"></i>  20</p>
            </div>
            <div className="info">
                <p><strong>Publicado por:</strong> Lorem Ipsu   </p>
                <p><strong>Lenguaje:</strong> Lorem Ipsu   </p>
                <p><strong>Fecha:</strong>09/06/2021</p>
            </div>
            <div className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, perferendis ipsa. Amet adipisci sunt enim ea harum velit, minus consequuntur, qui exercitationem perspiciatis
                possimus dolorum expedita odit, impedit nostrum quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro similique saepe quo cum expedita quas reprehenderit iusto
                repudiandae! Numquam distinctio repellat consectetur</p>
            </div>
            <strong>Autor:</strong>
            <div className="author">
                <p>- Lorem Ipsu</p>
            </div>
            <strong>Tags:</strong>
            <div className="tags">
                <div className="tag">
                    Lorem
                    </div>
                <div className="tag">
                    Lorem
                    </div>
                <div className="tag">
                    Lorem
                    </div>
                <div className="tag">
                    Lorem
                    </div>
                <div className="tag">
                    Lorem
                    </div>
            </div>
            <div className="container-redes">
                <div className="bg-black">
                    <i class="fab fa-facebook-f"></i>
                </div>
                <div className="bg-black">
                    <i class="fab fa-twitter"></i>
                </div>
                <div className="bg-black">
                    <i class="fas fa-link"></i>
                </div>

            </div>
            <div className="container-btn">
                <Link to='/single-resource' className="btn-leer">Leer Más</Link>
            </div>
        </div>
    );
}

export default Card;
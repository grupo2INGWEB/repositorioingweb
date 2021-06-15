import React, { useEffect } from 'react';
import './singleResource.css'
// import icon from '../../../assets/profile.png'

const SingleResource = () => {
    useEffect(() => {
        window.scroll({
            top: 0
        })
    }, [])
    return (
        <div className="container mb">
            <h3 className="title-single">Title of Single Resource</h3>
            <h4 className="color-p">Descripción</h4>
            <div className="info-single">
                <p><strong>Publicado por:</strong> Lorem Ipsum</p>
                <p><strong>Lenguaje:</strong> Lorem Ipsum</p>
                <p><strong>Fecha:</strong> 10/06/2021</p>
            </div>
            <div className="resource-single">
                <p><i class="fas fa-link"></i> <strong>Descargar recurso</strong></p>
                <hr />
                <p><strong>Tipo:</strong> Documento</p>
                <hr />
                <p className="p-download">Descargar</p>
            </div>
            <div className="calification-single">
                <p>Calificación:</p>
                <p><i class="fas fa-heart"></i>  20</p>
            </div>
            <div className="description-single">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem in minima at, beatae perspiciatis sit blanditiis! Nesciunt vel harum corrupti laborum aspernatur, repellat rem saepe distinctio sit molestiae asperiores!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui pariatur distinctio similique numquam, iusto saepe vero unde, veniam deleniti eum, deserunt recusandae quo ex assumenda autem. Asperiores voluptatibus quaerat odio!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus suscipit nostrum, itaque, vel quidem quas placeat sunt corporis esse asperiores ipsa fuga, molestiae alias. Impedit, quisquam? Quae doloribus architecto vero!
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit rem in minima at, beatae perspiciatis sit blanditiis! Nesciunt vel harum corrupti laborum aspernatur, repellat rem saepe distinctio sit molestiae asperiores!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui pariatur distinctio similique numquam, iusto saepe vero unde, veniam deleniti eum, deserunt recusandae quo ex assumenda autem. Asperiores voluptatibus quaerat odio!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus suscipit nostrum, itaque, vel quidem quas placeat sunt corporis esse asperiores ipsa fuga, molestiae alias. Impedit, quisquam? Quae doloribus architecto vero!
                </p>
            </div>
            <div className="author-single">
                <p>Autor:</p>
                <p>- Lorem Ipsum</p>
            </div>
            <div className="tags-single">
                <strong className="color-p">Tags:</strong>
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

            </div>
            <div className="detalles-single">
                <p className="detail">Detalles</p>
                <p><strong>Especialidad: </strong> Educación Infantil</p>
                <p><strong>Lenguaje: </strong> Español</p>
                <p><strong>Universidad: </strong> Universidad Técnica Particular de Loja</p>
                <p><strong>País: </strong> Ecuador</p>
                <p><strong>Plataforma: </strong> Moodle</p>
                <p><strong>Categoría: </strong> Matemáticas</p>
                <div className="container-shared">
                    <p>Compartir: </p>
                    <div className="icons">
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
                </div>
            </div>
            <div className="comments">
                <h4>Comentarios</h4>
                {/* Comentario 1 */}
                <div className="comment">
                    <div className="img">
                        <img src="/profile.png" alt="Profile Icon" />
                    </div>
                    <div className="decription-comment">
                        <p className="autor">Nombre del Autor</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum rerum ipsum tempore saepe itaque tempora obcaecati? Maxime hic optio corrupti dolore, repudiandae officiis quo eveniet accusantium recusandae magni exercitationem!
                        Lorem ipsum dolor. facilis, at expedita, nobis ad nihil optio! Nisi, laborum hic asperiores velit natus iste sapiente.
                        </p>
                        <p className="date-comment">10/06/2021</p>
                    </div>
                </div>
                {/* Comentario 2 */}
                <div className="comment">
                    <div className="img">
                        <img src="/profile.png" alt="Profile Icon" />
                    </div>
                    <div className="decription-comment">
                        <p className="autor">Nombre del Autor</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum rerum ipsum tempore saepe itaque tempora obcaecati? Maxime hic optio corrupti dolore, repudiandae officiis quo eveniet accusantium recusandae magni exercitationem!
                        Lorem ipsum dolor. facilis, at expedita, nobis ad nihil optio! Nisi, laborum hic asperiores velit natus iste sapiente.
                        </p>
                        <p className="date-comment">10/06/2021</p>
                    </div>
                </div>
                {/* Comentario 3 */}
                <div className="comment">
                    <div className="img">
                        <img src="/profile.png" alt="Profile Icon" />
                    </div>
                    <div className="decription-comment">
                        <p className="autor">Nombre del Autor</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum rerum ipsum tempore saepe itaque tempora obcaecati? Maxime hic optio corrupti dolore, repudiandae officiis quo eveniet accusantium recusandae magni exercitationem!
                        Lorem ipsum dolor. facilis, at expedita, nobis ad nihil optio! Nisi, laborum hic asperiores velit natus iste sapiente.
                        </p>
                        <p className="date-comment">10/06/2021</p>
                    </div>
                </div>

            </div>
            <div className="aggComments">
                <h4>Agregar Comentario</h4>
                <textarea name="aggComent" id="aggComent" placeholder="Agrega un comentario..." ></textarea>
                <button>Agregar</button>
            </div>
        </div>
    );
}

export default SingleResource;
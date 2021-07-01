import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './singleResource.css'
// import icon from '../../../assets/profile.png'

const SingleResource = () => {
    const history = useHistory();
    const {
        resources: { singleResource },
    } = useSelector((state) => state);

    const redirigir = () => {
        history.push('/');
    }
    useEffect(() => {
        if (!singleResource) {
            redirigir()
        } else {
            window.scroll({
                top: 0
            })

        }
    }, [singleResource])
    return (
        <div className="container mb">
            <h3 className="title-single">{singleResource?.title}</h3>
            <h4 className="color-p">Descripción</h4>
            <div className="info-single">
                <p><strong>Publicado por:</strong> {singleResource?.nameAdmin ? singleResource?.nameAdmin : "-------"}</p>
                <p><strong>Lenguaje:</strong> {singleResource?.language}</p>
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
                <p><i class="fas fa-heart"></i>  {singleResource?.calificacion}</p>
            </div>
            <div className="description-single">
                <p>
                    {singleResource?.description}
                </p>
                <br />
            </div>
            <div className="author-single">
                <p>Autor:</p>
                <p>- {singleResource?.nameAuthor}</p>
            </div>
            <div className="tags-single">
                <strong className="color-p">Tags:</strong>
                <div className="tags">
                    {
                        singleResource?.tags.map((tag) =>
                            <div className="tag">
                                {tag}
                            </div>
                        )
                    }
                </div>

            </div>
            <div className="detalles-single">
                <p className="detail">Detalles</p>
                <p><strong>Especialidad: </strong>{singleResource?.specialty}</p>
                <p><strong>Lenguaje: </strong> {singleResource?.language}</p>
                <p><strong>Universidad: </strong> {singleResource?.university}</p>
                <p><strong>País: </strong> {singleResource?.country}</p>
                <p><strong>Plataforma: </strong> {singleResource?.platform}</p>
                <p><strong>Categoría: </strong> {singleResource?.category}</p>
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
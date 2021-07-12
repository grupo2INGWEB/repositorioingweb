import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './singleResource.css'
import Swal from 'sweetalert2'
import { comentarElRecurso } from '../../redux/actions/resourceAction';
import { parseDate } from '../../helpers/helpers';
import { urlApi } from '../../constantes/constants';
// import icon from '../../../assets/profile.png'

const SingleResource = () => {
    const history = useHistory();
    const disptach = useDispatch();
    const [comment, setComment] = useState("");
    const {
        auth: { userData },
        resources: { singleResource, fetching },
    } = useSelector((state) => state);

    const redirigir = () => {
        history.push('/');
    }
    const startComment = () => {
        disptach(comentarElRecurso(singleResource.id, userData.token, comment, setComment))
    }

    const comprobarSesion = () => {
        if (!userData) {
            // Mostrar Alerta de iniciar sesón
            Swal.fire({
                title: "Debes de iniciar sesión, para poder comentar este recurso",
                icon: "warning"
            })
        } else {
            startComment()
        }
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
                <p><i className="fas fa-link"></i> <strong>Descargar recurso</strong></p>
                <hr />
                {/* <p><strong>Tipo:</strong> Documento</p> */}
                <hr />
                <a
                    href={`${urlApi}resource/descargar/${singleResource?.nameResource}`}
                    className="p-download"
                    download
                >Descargar</a>
            </div>
            <div className="calification-single">
                <p>Calificación:</p>
                <p><i className="fas fa-heart"></i>  {singleResource?.calificacion}</p>
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
                <p><strong>platforma: </strong> {singleResource?.platform}</p>
                <p><strong>Categoría: </strong> {singleResource?.category}</p>
                <div className="container-shared">
                    <p>Compartir: </p>
                    <div className="icons">
                        <div className="bg-black">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="bg-black">
                            <i className="fab fa-twitter"></i>
                        </div>
                        <div className="bg-black">
                            <i className="fas fa-link"></i>
                        </div>

                    </div>
                </div>
            </div>
            {/* Comentarios */}
            <div className="comments">
                <h4>Comentarios</h4>
                {/* Comentario 1 */}
                {
                    singleResource?.comments.map((comment) =>
                        <div className="comment">
                            <div className="img">
                                <img src="/profile.png" alt="Profile Icon" />
                            </div>
                            <div className="decription-comment">
                                <p className="autor">{comment.autor} <span className="autor-admin">{comment.idUser === singleResource.author ? "Autor" : ""} </span> </p>

                                <p>{comment.comment}</p>
                                <p className="date-comment">{parseDate(comment.created)}</p>
                            </div>
                        </div>
                    )
                }

            </div>
            <div className="aggComments">
                <h4>Agregar Comentario</h4>
                <textarea name="aggComent" id="aggComent" placeholder="Agrega un comentario..." value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button onClickCapture={comprobarSesion} >
                    {
                        fetching ? "Publicando...." : "Agregar"
                    }
                </button>
            </div>
        </div>
    );
}

export default SingleResource;
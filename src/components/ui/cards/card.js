import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom"
// import Switch from "react-switch";
import Swal from "sweetalert2";
import { changeSinglePage, likeARecurso, disLikeARecurso } from "../../../redux/actions/resourceAction"
import { cambiarEstadoPublicacion } from '../../../redux/actions/resourceAction';

const Card = ({
    calificacion,
    condition,
    tags,
    id,
    title,
    description,
    language,
    platform,
    country,
    create,
    nameAuthor,
    university,
    category,
    specialty,
    comments,
    isPending = false,
    isAdmin = false,
    usersLikes,
    nameAdmin,
    nameResource,
    urlResource,
    originalNameResource,
    author
}) => {
    // const [isApproved, setIsApproved] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();
    const {
        auth: { userData },
    } = useSelector((state) => state);


    const navigateToSinglePage = () => {
        dispatch(changeSinglePage({
            calificacion,
            condition,
            tags,
            id,
            title,
            description,
            language,
            platform,
            country,
            create,
            nameAuthor,
            university,
            category,
            specialty,
            comments,
            author,
            nameAdmin,
            nameResource,
            urlResource,
            originalNameResource,
        }, history, false))

    }
    const navigateToSinglePageEdit = () => {
        dispatch(changeSinglePage({
            calificacion,
            condition,
            tags,
            id,
            title,
            description,
            language,
            platform,
            country,
            create,
            nameAuthor,
            university,
            category,
            specialty,
            comments,
            author,
            nameAdmin,
            nameResource,
            urlResource,
            originalNameResource,
        }, history,
            true))

    }

    const changeSingleResources = () => {
        // ACTUALIZAR AL RECURSO SELECCIONADO
        const isPublish = condition === "Por publicar" ? true : false;
        dispatch(cambiarEstadoPublicacion(id, userData.token, isPublish, alertUpdate, alertErrorUpdate))
    }
    const alertUpdate = () => {
        const isPublish = condition === "Por publicar" ? true : false;
        return Swal.fire({
            title: isPublish ? "Recurso Publicado!" : "Recurso Oculto!",
            icon: "success",
        });
    }
    const alertErrorUpdate = () => {
        return Swal.fire({
            title: "Error al cambiar estado del recurso!",
            icon: "error",
        });
    }

    const verificarLike = () => {
        return usersLikes.includes(userData?.user._id);
    }
    const likeResource = () => {
        if (!userData) {
            Swal.fire({
                title: "Debes de iniciar sesión, para poder dar like a este recurso",
                icon: "warning"
            })
        } else {

            dispatch(likeARecurso(id, userData?.token))
        }

    }
    const disLikeResource = () => {
        if (!userData) {
            Swal.fire({
                title: "Debes de iniciar sesión, para poder dar like a este recurso",
                icon: "warning"
            })
        } else {
            dispatch(disLikeARecurso(id, userData?.token))
        }
    }

    return (
        <div className="card">
            <div className="title">
                <h4>{title}</h4>
                {
                    verificarLike() ?
                        <p><i onClickCapture={disLikeResource} className="fas fa-heart"></i>  {calificacion}</p>
                        : <p> <i onClickCapture={likeResource} className="far fa-heart"></i>  {calificacion}</p>
                }
            </div>
            <div className="info">
                <p><strong>Publicado por:</strong> {nameAuthor}</p>
                <p><strong>Lenguaje:</strong> {language}</p>
                <p><strong>Fecha:</strong>09/06/2021</p>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
            <strong>Autor:</strong>
            <div className="author">
                <p>- {nameAuthor}</p>
            </div>
            <strong>Tags:</strong>
            <div className="tags">
                {
                    tags?.map((tag) =>
                        <div className="tag" id={tag}>
                            {tag}
                        </div>

                    )
                }
            </div>
            <div className="container-redes">
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
            {
                !isAdmin ?
                    // Mostrar botones de editar y estado
                    <div className="container-isPending">
                        <div className={condition === "Por publicar" ? "btn-pendiente" : "btn-aprobado"}>
                            <p>{condition === "Por publicar" ? "Pendiente" : "Aprobado"}</p>
                        </div>
                        <div className="container-btnsAction">
                            <div className="btn-edit" onClickCapture={navigateToSinglePageEdit}>
                                <p>Editar</p>
                            </div>
                            <div className="btn-vermas" onClickCapture={navigateToSinglePage}>
                                <p>Ver mas</p>
                            </div>
                        </div>
                    </div>
                    :
                    !isPending ?
                        <div className="container-btn">
                            <Link to='/single-resource' className="btn-leer" onClickCapture={navigateToSinglePage}>Leer Más</Link>
                        </div> :
                        <div className="container-isPending">
                            <div className="btn-condition" onClickCapture={changeSingleResources}>
                                <p>Publicar</p>
                            </div>
                            <div className="container-btnsAction">
                                <div className="btn-edit" onClickCapture={navigateToSinglePageEdit} >
                                    <p>Editar</p>
                                </div>
                                <div className="btn-vermas">
                                    <p>Ver mas</p>
                                </div>
                            </div>
                        </div>

            }
        </div>
    );
}

export default Card;
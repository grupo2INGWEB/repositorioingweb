import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom"
// import Switch from "react-switch";
import Swal from "sweetalert2";
import { changeSinglePage } from "../../../redux/actions/resourceAction"
import { cambiarEstadoPublicacion } from '../../../redux/actions/resourceAction';

const Card = ({
    calificacion,
    condition,
    tags,
    id,
    title,
    description,
    language,
    plataform,
    country,
    create,
    nameAuthor,
    isPending = false,
    isAdmin = false
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
            plataform,
            country,
            create,
            nameAuthor,
        }, history))

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
    // const handelChangeSwitch = () => {
    //     setIsApproved(!isApproved)
    // };

    return (
        <div className="card">
            <div className="title">
                <h4>{title}</h4>
                <p><i class="fas fa-heart"></i>  {calificacion}</p>
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
                    <i class="fab fa-facebook-f"></i>
                </div>
                <div className="bg-black">
                    <i class="fab fa-twitter"></i>
                </div>
                <div className="bg-black">
                    <i class="fas fa-link"></i>
                </div>

            </div>
            {
                !isPending ?
                    <div className="container-btn">
                        <Link to='/single-resource' className="btn-leer" onClickCapture={navigateToSinglePage}>Leer Más</Link>
                    </div> :
                    <div className="container-isPending">
                        <div className="btn-condition" onClickCapture={changeSingleResources}>
                            <p>Publicar</p>
                        </div>
                        <div className="container-btnsAction">
                            <div className="btn-edit">
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
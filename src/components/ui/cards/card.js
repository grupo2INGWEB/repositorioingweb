import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import Switch from "react-switch";
import Swal from "sweetalert2";
import {
  changeSinglePage,
  likeARecurso,
  disLikeARecurso,
  buscarPorTags
} from "../../../redux/actions/resourceAction";
import { cambiarEstadoPublicacion, deleteResource } from "../../../redux/actions/resourceAction";
import { urlBackend } from "../../../constantes/constants";
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
  nameResource = "",
  urlResource,
  originalNameResource,
  author,
  darkmode = false,
}) => {
  // const [isApproved, setIsApproved] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    auth: { userData },
  } = useSelector((state) => state);

  const navigateToSinglePage = () => {
    dispatch(
      changeSinglePage(
        {
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
        },
        history,
        false
      )
    );
  };
  const navigateToSinglePageEdit = () => {
    dispatch(
      changeSinglePage(
        {
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
        },
        history,
        true
      )
    );
  };

  const changeSingleResources = () => {
    // ACTUALIZAR AL RECURSO SELECCIONADO
    const isPublish = condition === "Por publicar" ? true : false;
    dispatch(
      cambiarEstadoPublicacion(
        id,
        userData.token,
        isPublish,
        alertUpdate,
        alertErrorUpdate
      )
    );
  };
  const alertUpdate = () => {
    const isPublish = condition === "Por publicar" ? true : false;
    return Swal.fire({
      title: isPublish ? "Recurso Publicado!" : "Recurso Oculto!",
      icon: "success",
    });
  };
  const alertErrorUpdate = () => {
    return Swal.fire({
      title: "Error al cambiar estado del recurso!",
      icon: "error",
    });
  };

  const verificarLike = () => {
    return usersLikes.includes(userData?.user._id);
  };
  const likeResource = () => {
    if (!userData) {
      Swal.fire({
        title: "Debes de iniciar sesión, para poder dar like a este recurso",
        icon: "warning",
      });
    } else {
      dispatch(likeARecurso(id, userData?.token));
    }
  };
  const disLikeResource = () => {
    if (!userData) {
      Swal.fire({
        title: "Debes de iniciar sesión, para poder dar like a este recurso",
        icon: "warning",
      });
    } else {
      dispatch(disLikeARecurso(id, userData?.token));
    }
  };

  const buscarTagsIguales = (tag) => {
    // Hacer el dispatch
    dispatch(buscarPorTags(tag, history))
  }
  const alertOK = () => {
    Swal.fire({
      title: "Recurso Eliminado!",
      icon: "success"
    })
  }
  const alertError = () => {
    Swal.fire({
      title: "Error al eliminar recurso!",
      icon: "error"
    })
  }

  const eliminarRecurso = (type) => {
    dispatch(deleteResource(id, alertOK, alertError, userData.token, type))
  }

  return (
    <div className="d-flex m-2">
      <div className={darkmode ? "card-black" : "card"}>
        {
          nameResource.includes(".png") || nameResource.includes(".jpeg") || nameResource.includes(".jpeg") ?
            <img
              // src={originalNameResource ? originalNameResource:"https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"}
              // src={`http://${urlBackend}${nameResource}`}
              src={`${urlBackend}${nameResource}`}
              className="rounded-top-2 card-img-top img-top "
              alt="Img Destacada"
            /> :
            nameResource.includes(".pdf") ?
              <img
                // src={originalNameResource ? originalNameResource:"https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"}
                src="https://cdn.pixabay.com/photo/2020/03/10/17/02/pdf-4919559_1280.png"
                className="rounded-top-2 card-img-top img-top "
                alt="carro"
              /> :
              nameResource.includes(".mp4") || nameResource.includes(".mov") || nameResource.includes(".avi") || nameResource.includes(".mkv") || nameResource.includes(".divx") ?
                <img
                  // src={originalNameResource ? originalNameResource:"https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"}
                  src="https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png"
                  className="rounded-top-2 card-img-top img-top "
                  alt="carro"
                />
                :
                nameResource.includes(".doc") ?
                  <img
                    // src={originalNameResource ? originalNameResource:"https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"}
                    src="https://cdn.pixabay.com/photo/2013/07/12/15/56/word-document-150594_1280.png"
                    className="rounded-top-2 card-img-top img-top "
                    alt="carro"
                  /> :
                  <img
                    // src={originalNameResource ? originalNameResource:"https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"}
                    src="https://cdn.pixabay.com/photo/2017/07/09/20/48/icon-2488093_1280.png"
                    className="rounded-top-2 card-img-top img-top "
                    alt="carro"
                  />
        }
        {/* <p>
          {originalNameResource}
        </p> */}
        <div className="card-body p-4">
          <div className="card-title title ">
            <div className="row">
              <div className="col">
                <h4 className={darkmode ? "titleCard-dark" : "titleCard"}>
                  {title}
                </h4>
              </div>
              <div className="col text-end">
                {verificarLike() ? (
                  <p>
                    <i
                      onClickCapture={disLikeResource}
                      className={darkmode ? "fas fa-heart icon-heart" : "fas fa-heart icon-heart-w"}
                    ></i>
                    <span className={darkmode ? "numberlike" : ""}>{calificacion}</span>
                  </p>
                ) : (
                  <p>
                    <i
                      onClickCapture={likeResource}
                      className={darkmode ? "far fa-heart icon-heart" : "far fa-heart icon-heart-w"}
                    ></i>
                    <span className={darkmode ? "numberlike" : "numberlike-w"}>{calificacion}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="info">
            <p className={darkmode ? "text-description-dark" : "info-section"}>
              <strong>Publicado por: </strong> {nameAuthor}
            </p>
            <p className={darkmode ? "text-description-dark" : "info-section"}>
              <strong>Lenguaje: </strong> {language}
            </p>
            <p className={darkmode ? "text-description-dark" : "info-section"}>
              <strong>Fecha: </strong>09/06/2021
            </p>
          </div>
          <hr />
          <div className={darkmode ? "text-description-dark description" : "description"}>
            <p>{description}</p>
          </div>
          <strong className={darkmode ? "section-title-dark" : "section-title"}>Autor:</strong>
          <div className={darkmode ? "text-description-dark" : "author"}>
            <p>- {nameAuthor}</p>
          </div>
          <strong className={darkmode ? "section-title-dark" : "section-title"}>Tags:</strong>
          <div className="tags">
            {tags?.map((tag) => (
              <div className="tag " id={tag} onClickCapture={() => buscarTagsIguales(tag)}>
                {tag}
              </div>
            ))}
          </div>
          {/* <p>
          {
                  originalNameResource
                }    
          </p> */}
          <div className="container-redes mb-4">
            <div className="row">
              <div className="col">
                <div className="bg-black">
                  <i className="fab fa-facebook-f"></i>
                </div>
              </div>
              <div className="col">
                <div className="bg-black">
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
              <div className="col">
                <div className="bg-black">
                  <i className="fas fa-link"></i>
                </div>
              </div>
            </div>
          </div>
          <hr />

          {!isAdmin ? (
            // Mostrar botones de editar y estado
            <div className="container-isPending">
              <div
                className={
                  condition === "Por publicar"
                    ? "btn-pendiente"
                    : "btn-aprobado"
                }
              >
                <p>{condition === "Por publicar" ? "Pendiente" : "Aprobado"}</p>
              </div>
              <div className="container-btnsAction">
                <div
                  className="btn-edit"
                  onClickCapture={navigateToSinglePageEdit}
                >
                  <p>Editar</p>
                </div>
                <div
                  className="btn-vermas"
                  onClickCapture={navigateToSinglePage}
                >
                  <p>Ver mas</p>
                </div>
              </div>
              <div className="btn-delete">
                <i className="fas fa-trash" onClickCapture={() => eliminarRecurso('other')} />
              </div>
            </div>
          ) : !isPending ? (
            <div className="container-btn">
              <Link
                to="/single-resource"
                className="btn-leer"
                onClickCapture={navigateToSinglePage}
              >
                Leer Más
              </Link>
            </div>
          ) : (
            <div className="container-isPending">
              <div
                className="btn-condition"
                onClickCapture={changeSingleResources}
              >
                <p>Publicar</p>
              </div>
              <div className="container-btnsAction">
                <div
                  className="btn-edit"
                  onClickCapture={navigateToSinglePageEdit}
                >
                  <p>Editar</p>
                </div>
                <div className="btn-vermas">
                  <p>Ver mas</p>
                </div>
                <div className="btn-delete">
                  <i className="fas fa-trash" onClickCapture={() => eliminarRecurso('other')} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

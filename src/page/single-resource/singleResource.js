import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import "./singleResource.css";
import Swal from "sweetalert2";
import { buscarPorTags, comentarElRecurso, deleteResource, obtenerRecursoID } from "../../redux/actions/resourceAction";
import { parseDate } from "../../helpers/helpers";
import { urlApi, urlBackend } from "../../constantes/constants";
// import Fotter from "../footer-section/footer";
import PDFReader from "../../components/utils/pdfReader";
import autorIcon from "../../assets/img/autor.png"
import personIcon from "../../assets/img/persona.jpeg"
// import icon from '../../../assets/profile.png'


const SingleResource = () => {
  const params = useParams()
  const history = useHistory();
  const disptach = useDispatch();
  const [comment, setComment] = useState("");
  const {
    auth: { userData },
    resources: { singleResource, fetching },
  } = useSelector((state) => state);

  const buscarRecurso = () => {
    console.log("===> DENTRO DE METODO");
    disptach(obtenerRecursoID(params.id))
  };
  const startComment = () => {
    if (singleResource) {
      console.log(singleResource)
      disptach(
        comentarElRecurso(singleResource.id ?? singleResource._id, userData.token, comment, setComment)
      );
    } else {
      console.log("==> NO EXISTE RECURSO")
    }
  };

  const comprobarSesion = () => {
    if (!userData) {
      // Mostrar Alerta de iniciar sesón
      Swal.fire({
        title: "Debes de iniciar sesión, para poder comentar este recurso",
        icon: "warning",
      });
    } else {
      startComment();
    }
  };
  const buscarTagsIguales = (tag) => {
    // Hacer el dispatch
    disptach(buscarPorTags(tag, history))
  }

  const msgCopy = () => {
    Swal.fire({
      title: "Url copiada en portapapeles!",
      icon: "success"
    })
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

  const copyToClipboard = () => {
    const url = window.location.href;
    var textField = document.createElement("textarea");
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    msgCopy()
  }
  const eliminarRecurso = (type) => {
    disptach(deleteResource(singleResource?.id, alertOK, alertError, userData.token, type, history))
  }

  useEffect(() => {
    if (!singleResource) {
      console.log("===> NO EXISTE RECURSO")
      buscarRecurso();
      // console.log()
    }
    window.scroll({
      top: 0,
    });
  }, [singleResource]);
  return (
    <div className="container">
      {
        !singleResource ?
          <h2>Cargando...</h2> :
          <>
            <div className="topSeparatos"></div>
            <div className="text-center about-author">
              {
                singleResource?.nameResource?.includes(".png") || singleResource?.nameResource?.includes(".jpeg") || singleResource?.nameResource?.includes(".jpeg") ?
                  <div style={
                    {
                      backgroundImage: `url(${urlBackend}${singleResource?.nameResource})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }
                  }>
                  </div>
                  // <PDFReader url="http://localhost:5000/mipdf.pdf" />

                  :
                  singleResource?.nameResource?.includes(".pdf") ?
                    <PDFReader
                      url={`${urlBackend}${singleResource?.nameResource}`}
                    />
                    :
                    singleResource?.nameResource?.includes(".mp4") || singleResource?.nameResource?.includes(".mov") || singleResource?.nameResource?.includes(".avi") || singleResource?.nameResource?.includes(".mkv") || singleResource?.nameResource?.includes(".divx") ?
                      <video controls>
                        <source src={`${urlBackend}${singleResource?.nameResource}`} />
                      </video>
                      :
                      singleResource?.nameResource?.includes(".doc") ?
                        <div style={
                          {
                            backgroundImage: "url(https://cdn.pixabay.com/photo/2013/07/12/15/56/word-document-150594_1280.png)",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                          }
                        }>
                          {/* <img
                    src={`${urlBackend}${singleResource?.nameResource}`}
                    className="cover"
                    alt="Img Destacada"
                  /> */}
                        </div>
                        :
                        <div style={
                          {
                            backgroundImage: "url(https://cdn.pixabay.com/photo/2017/07/09/20/48/icon-2488093_1280.png)",
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                          }
                        }>
                          {/* <img
                    src={`${urlBackend}${singleResource?.nameResource}`}
                    className="cover"
                    alt="Img Destacada"
                  /> */}
                        </div>
              }
            </div>
            <h3 className="title-single ">{singleResource?.title} </h3>
            {
              userData?.user.rol === "admin" ?
                <div className="btn-delete">
                  <i className="fas fa-trash" onClickCapture={() => eliminarRecurso('other')} />
                </div>
                : <></>
            }
            <hr />
            <h4 className="color-p">Descripción</h4>
            <div className="info-single py-4">
              <p>
                <strong className="description-text">Publicado por: </strong>{" "}
                {singleResource?.nameAdmin ? singleResource?.nameAdmin : "-------"}
              </p>
              <p>
                <strong className="description-text">Lenguaje: </strong>{" "}
                {singleResource?.language}
              </p>
              <p>
                <strong className="description-text">Fecha: </strong> 10/06/2021
        </p>
            </div>
            <a
              href={`${urlApi}resource/descargar/${singleResource?.nameResource}`}
              className="p-download"
              download
            >
              <div className="btn resource-single">
                <div className="row w-100 p-2">
                  <div className="col text-start">
                    <p className="ml-2">
                      <i className="fas fa-link"></i>{" "}
                      <strong>Descargar recurso</strong>
                    </p>
                  </div>
                  <div className="col text-end">Descargar</div>
                </div>
              </div>
            </a>
            <div className="calification-single">
              <p className="titleCalificacion">Calificación:</p>
              <p>
                <i className="fas fa-heart"></i> {singleResource?.calificacion}
              </p>
            </div>
            <div className="description-single">
              <p>{singleResource?.description}</p>
              <br />
            </div>
            <div className="author-single">
              <p className="titleCalificacion">Autor:</p>
              <p className="description-single mt-4">
                - {singleResource?.nameAuthor}
              </p>
            </div>
            <div className="tags-single">
              <strong className="titleCalificacion">Tags:</strong>
              <div className="tags">
                {singleResource?.tags.map((tag) => (
                  <div className="tag" id={tag} onClickCapture={() => buscarTagsIguales(tag)} >{tag}</div>
                ))}
              </div>
            </div>
            <div className="detalles-single">
              <p className="titleCalificacion">Detalles:</p>
              <p className="detail-content mt-4">
                <strong className="title-detail">Especialidad: </strong>
                {singleResource?.specialty}
              </p>
              <p className="detail-content">
                <strong className="title-detail">Lenguaje: </strong>{" "}
                {singleResource?.language}
              </p>
              <p className="detail-content">
                <strong className="title-detail">Universidad: </strong>{" "}
                {singleResource?.university}
              </p>
              <p className="detail-content">
                <strong className="title-detail">País: </strong>{" "}
                {singleResource?.country}
              </p>
              <p className="detail-content">
                <strong className="title-detail">platforma: </strong>{" "}
                {singleResource?.platform}
              </p>
              <p className="detail-content">
                <strong className="title-detail">Categoría: </strong>{" "}
                {singleResource?.category}
              </p>
              <div className="container-redes mb-4">
                <script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script>
                <div className="row">
                  <div className="col">
                    <div className="bg-black">
                      <a target="_blank" href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-black">
                      <a href={`https://twitter.com/intent/tweet?text=Mira%20el%20recurso:%20${singleResource?.title}%20de%20la%20Universidad:%20${singleResource?.university}&url=http%3A%2F%2Flocalhost:3000%2Fsingle-resource%2F${params.id}`} target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-black" onClickCapture={copyToClipboard}>
                      <i className="fas fa-link"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="separator-redes"></div>
            {/* Comentarios */}
            <div className="comments">
              <h4 className="titleCalificacion">Comentarios</h4>
              {/* Comentario 1 */}
              {singleResource?.comments.map((comment) => (
                <div className="comment">
                  <div className="img">
                    {comment.idUser === singleResource.author ?
                      <img src={autorIcon} alt="Autor" />
                      :
                      <img src={personIcon} alt="Profile Icon" />
                    }
                  </div>
                  <div className="details col p-4">
                    <h4 className="title-detail mb-4">
                      <b>Acerca del Autor:</b>
                    </h4>
                    <h4 className="name"> {comment.autor}  <span className="autor-admin">
                      {comment.idUser === singleResource.author ? "Autor" : ""}{" "}
                    </span>{" "}</h4>
                    <p>
                      {comment.comment}
                    </p>
                    <p className="date-comment">{parseDate(comment.created)}</p>
                  </div>
                  {/* <div className="decription-comment">
              <p className="autor">
                {comment.autor}{" "}
                <span className="autor-admin">
                  {comment.idUser === singleResource.author ? "Autor" : ""}{" "}
                </span>{" "}
              </p>

              <p>{comment.comment}</p>
              <p className="date-comment">{parseDate(comment.created)}</p>
            </div> */}
                </div>
              ))}
            </div>

            <div className="aggComments">
              <h4 className="title-detail mb-4">
                <b>Agregar Comentario</b>
              </h4>
              <textarea
                name="aggComent"
                id="aggComent"
                placeholder="Agrega un comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button onClickCapture={comprobarSesion} className="w-100 ">
                {fetching ? "Publicando...." : "Agregar"}
              </button>
              <div className="separator"></div>
            </div>

          </>
      }

    </div>
  );
};

export default SingleResource;

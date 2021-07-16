import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./singleResource.css";
import Swal from "sweetalert2";
import { comentarElRecurso } from "../../redux/actions/resourceAction";
import { parseDate } from "../../helpers/helpers";
import { urlApi } from "../../constantes/constants";
import Fotter from "../footer-section/footer";
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
    history.push("/");
  };
  const startComment = () => {
    disptach(
      comentarElRecurso(singleResource.id, userData.token, comment, setComment)
    );
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

  useEffect(() => {
    if (!singleResource) {
      redirigir();
    } else {
      window.scroll({
        top: 0,
      });
    }
  }, [singleResource]);
  return (
    <div className="container">
      <div className="topSeparatos"></div>
      <div className="text-center about-author">
        <img
          src="https://icdn.dtcn.com/image/digitaltrends_es/m-de-volvo-carros-bajo-demanda-feat.jpg"
          className=" img-fluid rounded text-center cover"
          alt="..."
          height="70"
        />
      </div>
      <h3 className="title-single ">{singleResource?.title}</h3>
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
            <div className="tag">{tag}</div>
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
      </div>
      <div className="separator-redes"></div>
      <div className="about-author mt-4">
        <div className="row p-4">
          <div className="thumb col-1 ">
            <img
              src="https://maanjaa.com/themeger/katen-demo/html/images/other/avatar-about.png"
              alt="Katen Doe"
            />
          </div>
          <div className="details col p-4">
            <h4 className="title-detail mb-4">
              <b>Acerca del Autor:</b>
            </h4>
            <h4 className="name">Katen Doe</h4>
            <p>
              Hello, I’m a content writer who is fascinated by content fashion,
              celebrity and lifestyle. She helps clients bring the right content
              to the right people.
            </p>
          </div>
        </div>
      </div>
      {/* Comentarios */}
      <div className="comments">
        <h4 className="titleCalificacion">Comentarios</h4>
        {/* Comentario 1 */}
        {singleResource?.comments.map((comment) => (
          <div className="comment">
            <div className="img">
              <img src="/profile.png" alt="Profile Icon" />
            </div>
            <div className="decription-comment">
              <p className="autor">
                {comment.autor}{" "}
                <span className="autor-admin">
                  {comment.idUser === singleResource.author ? "Autor" : ""}{" "}
                </span>{" "}
              </p>

              <p>{comment.comment}</p>
              <p className="date-comment">{parseDate(comment.created)}</p>
            </div>
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
      <Fotter />
    </div>
  );
};

export default SingleResource;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./singleResource.css";
import Swal from "sweetalert2";
import { buscarPorTags, comentarElRecurso } from "../../redux/actions/resourceAction";
import { parseDate } from "../../helpers/helpers";
import { urlApi, urlBackend } from "../../constantes/constants";
import Fotter from "../footer-section/footer";
import PDFReader from "../../components/utils/pdfReader";
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
  const buscarTagsIguales = (tag) => {
    // Hacer el dispatch
    disptach(buscarPorTags(tag, history))
  }

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
        {
          singleResource?.nameResource.includes(".png") || singleResource?.nameResource.includes(".jpeg") || singleResource?.nameResource.includes(".jpeg") ?
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
            singleResource?.nameResource.includes(".pdf") ?
              <PDFReader
                url={`${urlBackend}${singleResource?.nameResource}`}
              />
              :
              singleResource?.nameResource.includes(".mp4") || singleResource?.nameResource.includes(".mov") || singleResource?.nameResource.includes(".avi") || singleResource?.nameResource.includes(".mkv") || singleResource?.nameResource.includes(".divx") ?
                <video controls>
                  <source src={`${urlBackend}${singleResource?.nameResource}`} />
                </video>
                :
                singleResource?.nameResource.includes(".doc") ?
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
      {/* Comentarios */}
      <div className="comments">
        <h4 className="titleCalificacion">Comentarios</h4>
        {/* Comentario 1 */}
        {singleResource?.comments.map((comment) => (
          <div className="comment">
            <div className="img">
              {comment.idUser === singleResource.author ?
                <img src="https://cdn.icon-icons.com/icons2/11/PNG/256/writer_person_people_man_you_1633.png" alt="Autor" />
                :
                <img src="https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085642?k=6&m=639085642&s=170667a&w=0&h=Xq5G_D9UILnAc9u7Ha1NoeQpNPkW3SIk0st25O_KUnU=" alt="Profile Icon" />
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
      <Fotter />
    </div>
  );
};

export default SingleResource;

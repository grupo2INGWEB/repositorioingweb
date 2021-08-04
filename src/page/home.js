import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import BtnVerMas from "../components/ui/bt-ver-mas/btn_vermas";
import Card from "../components/ui/cards/card";
// import Cards from '../components/ui/cards/cards';
import TitleSection from "../components/ui/title-section/title-section";
import { motorDeBusqueda } from "../redux/actions/resourceAction";
import Fotter from "./footer-section/footer";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [valuesMotor, setValuesMotor] = useState("")
  const {
    resources: { listRecentResources, listMostValued, listRecommended },
  } = useSelector((state) => state);

  const shortRecent = () => {
    return listRecentResources.slice(0, 6);
  };
  const shortValued = () => {
    return listMostValued.slice(0, 6);
  };
  const shortRecommended = () => {
    return listRecommended.slice(0, 6);
  };
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      dispatch(motorDeBusqueda(valuesMotor, history))
    }
  }

  return (
    <>
      {/* <LayoutHeader> */}
      <div>
        <div className="">
          <div className="separator"></div>
          <div className="container col-xxl-8  ">
            <h2 className="fw-bold2 lh-2 mb-3" >Recursos gratis descargables</h2>
            <p className="description-inputFind">Busca en toda la red de recursos disponibles el que necesites</p>
            <div className="container-input">
              <input type="text" className="input-homeFind" placeholder="Ej: Matemáticas" value={valuesMotor} onChange={(e) => setValuesMotor(e.target.value)} onKeyDown={handleInputChange} />
            </div>
            <div className="row flex-lg-row-reverse align-items-center ">
              <div className="col-10 col-sm-8 col-lg-6">
                <img
                  src="https://i.imgur.com/SlSVIUZ.png"
                  className="d-block mx-lg-auto img-fluid mt-4"
                  alt="Bootstrap Themes"
                  width="700"
                  height="300"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6 description">
                <h1 className="display-5 fw-bold lh-1 mb-3">
                  Recursos Disponibles
                </h1>
                {/* <hr/>      */}
                <p className="description-header pt-2">
                  Encuentra los artículos más buscados dentro de la comunidad,
                  conoce nuevas experiencias, lee, busca, aprende.
                </p>
                <hr />
                <p className="text-muted description-header fs-4">
                  Te recomendamos visitar las siguientes secciones...
                </p>
                <div
                  id="navbar-example2"
                  className="d-grid gap-2 d-md-flex justify-content-md-start pt-4"
                >
                  <a href="#scrollspyHeading1">
                    <button
                      type="button"
                      className="btn p-2 px-5 text-btn btn-actions-success w-100"
                    >
                      Recientes
                    </button>
                  </a>
                  <a href="#scrollspyHeading2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg px-4 text-btn btn-actions-success w-100"
                    >
                      Mas Valorados
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="separator"></div>
          </div>
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example2"
            data-bs-offset="0"
            className="scrollspy-example"
            tabindex="0"
          >
            <div
              className="separator-area text-secondary text-center"
              id="scrollspyHeading1"
            >
              <h1 className="fw-bold text-white">Recursos Recientes</h1>
              <div className="col-lg-6 mx-auto">
                <p className="description-text-separator">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>
              </div>
            </div>
            <div className="section-recientes">
              <div className="container">
                <div className="d-flex justify-content-center flex-wrap ">
                  {/* <TitleSection
                  nombre="Recientes"
                  url="/all-resource"
                  state="Recientes"
                  mostrarBtn={true}
                />
                 */}

                  {listRecentResources.length === 0 ? (
                    <h3>No hay Recursos recientes</h3>
                  ) : (
                    shortRecent().map((resource) => (
                      <Card
                        calificacion={resource.calificacion}
                        condition={resource.condition}
                        country={resource.country}
                        create={resource.create}
                        description={resource.description}
                        id={resource._id}
                        language={resource.language}
                        nameAuthor={resource.nameAuthor}
                        platform={resource.platform}
                        tags={resource.tags}
                        title={resource.title}
                        isAdmin={true}
                        isPending={false}
                        key={resource._id}
                        university={resource.university}
                        category={resource.category}
                        specialty={resource.specialty}
                        usersLikes={resource.usersLikes}
                        comments={resource.comments}
                        author={resource.author}
                        nameResource={resource.nameResource}
                        urlResource={resource.urlResource}
                        originalNameResource={resource.originalNameResource}
                        darkmode={true}
                        licence={resource.licence}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="w-100 text-center pt-4" id="scrollspyHeading2">
                <BtnVerMas
                  nombre="Ver Más"
                  url="/all-resource"
                  state="Recientes"
                // url="/all-resource"
                // state="Más Valorados"
                />
              </div>
            </div>
            <div className="section-valorados">
              <div className="title-section-valorados container">
                <h1 className="fw-bold text-dark">Mas Valorados</h1>
                <hr />
              </div>
              <div className="d-flex justify-content-center flex-wrap container">
                {listMostValued.length === 0 ? (
                  <h3>No hay Recursos recientes</h3>
                ) : (
                  shortValued().map((resource) => (
                    <Card
                      calificacion={resource.calificacion}
                      condition={resource.condition}
                      country={resource.country}
                      create={resource.create}
                      description={resource.description}
                      id={resource._id}
                      language={resource.language}
                      nameAuthor={resource.nameAuthor}
                      platform={resource.platform}
                      tags={resource.tags}
                      title={resource.title}
                      university={resource.university}
                      category={resource.category}
                      specialty={resource.specialty}
                      isAdmin={true}
                      isPending={false}
                      key={resource._id}
                      usersLikes={resource.usersLikes}
                      nameAdmin={resource.nameAdmin}
                      comments={resource.comments}
                      author={resource.author}
                      nameResource={resource.nameResource}
                      urlResource={resource.urlResource}
                      originalNameResource={resource.originalNameResource}
                      licence={resource.licence}
                    />
                  ))
                )}
              </div>
              <div className="w-100 text-center pt-4 pb-5">
                <BtnVerMas
                  nombre="Ver Más"
                  // url="/all-resource"
                  // state="Recientes"
                  url="/all-resource"
                  state="Más Valorados"
                />
              </div>
            </div>
            {/* <TitleSection
            nombre="Recomendados"
            url="/all-resource"
            state="Recomendados"
            mostrarBtn={true}
          /> */}
            <div className="recomendados-section">
              <div className="second-separator text-secondary text-center">
                <h1 className="fw-bold text-dark">
                  Publicaciones Recomendadas
                </h1>
                <div className="col-lg-6 mx-auto">
                  <p className="description-text-separator">
                    Quickly design and customize responsive mobile-first sites
                    with Bootstrap, the world’s most popular front-end open
                    source toolkit, featuring Sass variables and mixins,
                    responsive grid system, extensive prebuilt components, and
                    powerful JavaScript plugins.
                  </p>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center flex-wrap">
                  {listRecommended.length === 0 ? (
                    <h3>No hay Recursos Recomendados</h3>
                  ) : (
                    shortRecommended().map((resource) => (
                      <Card
                        calificacion={resource.calificacion}
                        condition={resource.condition}
                        country={resource.country}
                        create={resource.create}
                        description={resource.description}
                        id={resource._id}
                        language={resource.language}
                        nameAuthor={resource.nameAuthor}
                        platform={resource.platform}
                        tags={resource.tags}
                        title={resource.title}
                        university={resource.university}
                        category={resource.category}
                        specialty={resource.specialty}
                        isAdmin={true}
                        isPending={false}
                        key={resource._id}
                        usersLikes={resource.usersLikes}
                        nameAdmin={resource.nameAdmin}
                        comments={resource.comments}
                        author={resource.author}
                        nameResource={resource.nameResource}
                        urlResource={resource.urlResource}
                        originalNameResource={resource.originalNameResource}
                        licence={resource.licence}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="w-100 text-center pt-4 pb-5">
                <BtnVerMas
                  nombre="Ver Más"
                  // url="/all-resource"
                  // state="Recientes"
                  url="/all-resource"
                  state="Recomendados"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="extencion-recomendados">
          <Fotter />
        </div> */}
        {/* </LayoutHeader> */}
      </div>
    </>
  );
};

export default Home;

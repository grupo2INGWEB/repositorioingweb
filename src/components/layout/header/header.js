import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { useFormRegister } from "../../../hooks/useFormRegister";
import { useFormLogin } from "../../../hooks/useFormLogin";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../../../redux/actions/authAction";
import {
  filterSpecialtyResources,
  reinicarState,
} from "../../../redux/actions/resourceAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
  },
};
const custom2Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
  },
};
Modal.setAppElement("#root");

const LayoutHeader = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, handleInputChange, handleBlur, sendDataRegister] =
    useFormRegister({
      email: "",
      name: "",
      password: "",
      repassword: "",
      errorRegister: "",
    });
  const [valuesLogin, handleInputChangeLogin, sendDataLogin] = useFormLogin({
    email2: "",
    password2: "",
    errorLogin: "",
  });

  const { email2, password2, errorLogin } = valuesLogin;
  const { email, name, password, repassword, errorRegister } = values;
  const {
    auth: { fetching, userData, msgError },
  } = useSelector((state) => state);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal2IsOpen, setIsOpen2] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function openModalRegister() {
    setIsOpen2(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setIsOpen2(false);
  }

  // Función para escuchar cambios en el select de recurso
  const handleChangeRecurso = useCallback(
    (itemSelected) => {
      switch (itemSelected) {
        case 0:
          // Redirigir a los recursos (Home)
          history.push("/");
          break;
        case 1:
          // Redirigir a Crear recurso
          history.push("/create-resource");
          break;
        case 2:
          // Redirigir a Mis recursos
          history.push("/my-resource");
          break;
        case 3:
          // Redirigir a Mis recursos
          history.push("/pending-resource");
          break;
        case 4:
          // Redirigir a Mis recursos
          history.push("/users");
          break;

        default:
          break;
      }
    },
    [history]
  );

  const logOut = () => {
    Swal.fire({
      title: "¿Deseas Salir?",
      icon: "question",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        dispatch(cerrarSesion(history));
        dispatch(reinicarState());
      }
    });
  };

  const tipoEspecialidad = (title) => {
    dispatch(filterSpecialtyResources(title));
    history.push("/all-resource", title);
  };

  return (
    <>
      <header className="fixed-top">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <nav>
          <ul className="ul-nav">
            {userData?.user.rol === "admin" ? (
              <li onClickCapture={() => handleChangeRecurso(4)}>Usuarios</li>
            ) : (
              <></>
            )}
            {!userData ? (
              <></>
            ) : userData?.user.rol !== "internauta" ? (
              <li>
                <p>
                  Recursos  
                </p>
                <ul>
                  <li onClickCapture={() => handleChangeRecurso(1)}>
                    Crear Recurso
                  </li>
                  <li onClickCapture={() => handleChangeRecurso(2)}>
                    Mis Recursos
                  </li>
                  {/* En caso de ser admin saldrá esta opcion */}
                  {userData?.user.rol === "admin" ? (
                    <li onClickCapture={() => handleChangeRecurso(3)}>
                      Recursos Pendientes
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </li>
            ) : (
              <></>
            )}
            <li>
              <p>
                <div className="row">
                  <div className="col-10">Especialidad</div>
                  <div className="col-2">
                     
                  </div>
                </div>
              </p>
              <ul className="subMenu">
                <li
                  onClickCapture={() => tipoEspecialidad("Educación Infantil")}
                >
                  Educación Infantil
                </li>
                <li
                  onClickCapture={() => tipoEspecialidad("Educación Primaria")}
                >
                  Educación Primaria
                </li>
                <li
                  onClickCapture={() =>
                    tipoEspecialidad("Educación Secundaria")
                  }
                >
                  Educación Secundaria
                </li>
                <li
                  onClickCapture={() => tipoEspecialidad("Educación Superior")}
                >
                  Educación Superior
                </li>
              </ul>
            </li>
            <li>
              <a
                onClickCapture={() => {
                  history.push("/all-resource", "Más Valorados");
                  window.scroll({
                    top: 0,
                  });
                }}
              >
                Más Valorado
              </a>
            </li>
            <li>
              <a
                onClickCapture={() => {
                  history.push("/all-resource", "Recomendados");
                  window.scroll({
                    top: 0,
                  });
                }}
              >
                Recomendados
              </a>
            </li>
            <li className="pl-4">
              <a
                onClickCapture={() => {
                  history.push("/all-resource", "Recientes");
                  window.scroll({
                    top: 0,
                  });
                }}
              >
                Recientes
              </a>
            </li>
            <li>
              <div class="search-box">
                <button class="btn-search">
                  <i class="fas fa-search"></i>
                </button>
                <input
                  type="text"
                  class="input-search"
                  placeholder="Buscar Recurso"
                />
              </div>
            </li>
            {userData ? (
              <li>
                <i className="fas fa-sign-out-alt" onClickCapture={logOut}></i>
              </li>
            ) : (
              <li>
                <i
                  className="fas fa-sign-in-alt"
                  onClickCapture={openModal}
                ></i>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {props.children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login"
      >
        <div className="container-login">
          <h2>Repositorio</h2>
          <strong>Correo</strong>
          <input
            type="email"
            name="email2"
            id="email2"
            placeholder="Correo"
            value={email2}
            onChangeCapture={handleInputChangeLogin}
          />
          <strong>Contraseña</strong>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Contraseña"
            value={password2}
            onChangeCapture={handleInputChangeLogin}
          />
          {errorLogin !== "" ? (
            <p className="error-msg">{errorLogin}</p>
          ) : (
            <></>
          )}
          <button
            className="btn-ingresar"
            onClickCapture={() => {
              console.log("CLICK");
              if (!fetching) {
                console.log("CLICK2");
                sendDataLogin(closeModal);
              }
            }}
          >
            {fetching ? "Iniciando..." : "Ingresar"}
          </button>
          <button
            onClickCapture={() => {
              closeModal();
              openModalRegister();
            }}
            className="btn-pass"
          >
            Registrarse
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modal2IsOpen}
        onRequestClose={closeModal2}
        style={custom2Styles}
        contentLabel="Login"
      >
        <div className="container-login">
          <h2>Registro</h2>
          <strong>Nombre</strong>
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" Tu Nombre"
            value={name}
            onChangeCapture={handleInputChange}
          />
          <strong>Correo</strong>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            value={email}
            onChangeCapture={handleInputChange}
          />
          <strong>Contraseña</strong>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChangeCapture={handleInputChange}
          />
          <strong>Repite la Contraseña</strong>
          <input
            type="password"
            name="repassword"
            id="repassword"
            placeholder="Contraseña"
            value={repassword}
            onChangeCapture={handleInputChange}
            onBlur={handleBlur}
          />
          {errorRegister !== "" ? (
            <p className="error-msg">{errorRegister}</p>
          ) : (
            <></>
          )}
          {msgError ? <p className="error-msg">{msgError}</p> : <></>}
          <button
            className="btn-ingresar"
            onClickCapture={() => {
              if (!fetching) {
                sendDataRegister();
              }
            }}
          >
            {" "}
            {fetching ? "Registrando..." : "Registrarse"}
          </button>
          <button
            onClickCapture={() => {
              closeModal2();
              openModal();
            }}
            className="btn-pass"
          >
            Iniciar Sesión
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LayoutHeader;

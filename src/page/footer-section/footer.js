import React from "react";
import "../footer-section/footer.css";
import logo from "../../assets/img/logoUTPL.png"

function Fotter() {
  return (
    <div className="fotter-section px-4 py-4">
      <footer className="container d-flex">
        <div className="logo">
          <img src={logo} alt="UTPL" />
        </div>
        <div className="contactos">
          <div>
            <h4>Contactos</h4>
            <ul>
              <li><i className="fas fa-map-marker"></i> <a href="/#">San Cayetano Alto - Loja</a></li>
              <li><i className="fas fa-map-marker"></i><a href="/#">Centros UTPL</a></li>
              <li><i className="fas fa-mail-bulk"></i><a href="/#"> Buzón de consultas</a></li>
              <li><i className="fas fa-headphones"></i><a href="/#"> 1800 88 75 88</a></li>
              <li><i className="fab fa-whatsapp"></i><a href="/#"> WhatsApp: 099 956 5400</a></li>
              <li><i className="fas fa-phone-alt"></i><a href="/#"> PBX: 07 370 1444</a></li>
            </ul>
          </div>
        </div>
        <div className="vinculos">
          <div>
            <h4>Vínculos de interés</h4>
            <div>
              <ul>
                <li><a href="/#"><i className="fas fa-circle"></i> Decide ser más</a></li>
                <li><a href="/#"><i className="fas fa-circle"></i> Admisiones</a></li>
                <li><a href="/#"><i className="fas fa-circle"></i> Noticias</a></li>
                <li><a href="/#"><i className="fas fa-circle"></i> Trabaja con nosotros</a></li>
              </ul>
              <ul>
                <li><a href="/#"><i className="fas fa-circle"></i>Internacional</a></li>
                <li><a href="/#"><i className="fas fa-circle"></i>Eventos</a></li>
                <li><a href="/#"><i className="fas fa-circle"></i>Alumni</a></li>
              </ul>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}

export default Fotter;

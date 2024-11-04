import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Icono para el botón de retroceso
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Importa Animate.css
import "../styles/D_header.css";
import Form_D from "../components/Form_D";
import { Collapse } from "react-bootstrap";

const Header = () => {
  // Estado para controlar la animación
  const [animate, setAnimate] = useState(false);

  // Función para manejar el clic del botón
  const handleClick = () => {
    setAnimate(true); // Activa la animación
    setTimeout(() => setAnimate(false), 1000000); // Desactiva la animación después de 1 segundo
  };

  // Estado para controlar el colapsable
  const [open, setOpen] = useState(false);

  return (
    <div className="dialog-page bor-r animate__animated animate__fadeIn">
      <div className="header-container bor-n">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <button
              onClick={handleClick}
              className={`btn back-btn ${
                animate ? "animate__animated animate__slideInLeft" : ""
              }`}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="col text-center">
            <h1 className="header-title animate__animated animate__fadeInDown">
              Make your own dialogs!
            </h1>
          </div>
          <div className="col-auto">
            <button className="btn create-btn animate__animated animate__fadeInRight">
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="dialog-page bor-r animate__animated animate__fadeInUp">
        <div className="form-dialog">
          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Story Context
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="The story takes place in..."
            />
          </div>
          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Story
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="In a galaxy far, far away..."
            />
          </div>
          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="disabledSelect" className="form-label">
              Number of characters
            </label>
            <select id="disabledSelect" className="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="mb-3 box-form bor-n animate__animated animate__fadeIn">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="disabledFieldsetCheck"
                checked={open} // Sincroniza el estado del checkbox con el colapsable
                onChange={() => setOpen(!open)} // Alterna el estado al hacer clic
                aria-controls="collapse-form"
                aria-expanded={open}
              />
              <label
                className="form-check-label"
                htmlFor="disabledFieldsetCheck"
              >
                Characters Attributes
              </label>
            </div>
          </div>
          <Collapse in={open}>
            <div
              id="collapse-form"
              className={`mb-3 box-form bor-n ${
                open ? "animate__animated animate__fadeIn" : ""
              }`}
            >
              <Form_D />
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useCallback, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/D_header.css";
import Form_D from "../components/Form_D";
import Collapse from "react-bootstrap/Collapse";

import Button from 'react-bootstrap/Button';

const Header = () => {
  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setAnimate(!animate);
  };

  const handleCollapseToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  // UseEffect para depurar cambios de estado
  useEffect(() => {
    console.log("Estado `open` cambiado a:", open);
  }, [open]);

  return (
    <div className="container bor-n mt-5">
      <div className="header-container bor-n mt-5">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <button onClick={handleClick} className={`btn back-btn`}>
              <FaArrowLeft />
            </button>
          </div>
          <div className="col text-center">
            <h1 className="header-title">Make your own dialogs!</h1>
          </div>
          <div className="col-auto">
            <button className="btn create-btn">Create</button>
          </div>
        </div>
      </div>
      <div className="dialog-page bor-r">
        <div className="form-dialog">
          <div className="mb-3 box-form">
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
          <div className="mb-3 box-form">
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
          <div className="mb-3 box-form">
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
          <div className="mb-3 box-form bor-n">
            <div className="form-check">
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                click
              </Button>
              <label
                className="form-check-label"
                htmlFor="disabledFieldsetCheck"
              >
                Characters Attributes
              </label>
            </div>
          </div>
          <div>
          <Collapse in={open}>
            <div id="collapse-form" className="mb-3 box-form bor-n">
              <Form_D />
            </div>
          </Collapse>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;

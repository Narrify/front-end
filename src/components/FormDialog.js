import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Icon for the back button
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Import Animate.css
import "../styles/Dialog.css";
import FormCharacter from "../components/FormCharacter";
import useDialog from "../Hooks/useDialog";
import { Modal, Button } from "react-bootstrap"; // Importar componentes de Bootstrap para el modal
import Show_json from "../components/Show_Json"; // Importa el componente Show_json

const FormDialog = () => {
  const [animate, setAnimate] = useState(false);
  const { response, fetchDialog } = useDialog();
  const [open, setOpen] = useState(false);

  const [dialog, setDialog] = useState({
    story: "",
    settings: {
      number_of_scenes: 0,
      number_of_characters: 0,
    },
    characters: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    story: false,
    number_of_scenes: false,
    number_of_characters: false,
  });

  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  // Función para controlar la animación
  const handleClick = () => {
    setAnimate(!animate);
  };

  const handleAddCharacter = (newCharacter) => {
    setDialog((prevDialog) => ({
      ...prevDialog,
      characters: [...prevDialog.characters, newCharacter],
    }));
    console.log("Received character from child:", newCharacter);
  };

  // Manejo de validación antes de mostrar el modal
  const handleCreate = () => {
    const errors = {
      story: dialog.story.trim() === "",
      number_of_scenes: dialog.settings.number_of_scenes === 0,
      number_of_characters: dialog.settings.number_of_characters === 0,
    };
    setValidationErrors(errors);

    if (
      !errors.story &&
      !errors.number_of_scenes &&
      !errors.number_of_characters
    ) {
      setShowModal(true); // Mostrar el modal de confirmación
    }
  };

  // Función para confirmar el envío y limpiar campos
  const handleConfirmCreate = () => {
    const jsonData = JSON.stringify(dialog);
    console.log("Generated JSON:", jsonData);
    fetchDialog(jsonData);

    // Limpiar los campos
    setDialog({
      story: "",
      settings: {
        number_of_scenes: 0,
        number_of_characters: 0,
      },
      characters: [],
    });

    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className="container animate__animated animate__fadeIn mt-5">
      <div className="header-container mt-6">
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
            <button
              className="btn create-btn animate__animated animate__fadeInRight"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="form-page animate__animated animate__fadeInUp">
        <div className="form-dialog">
          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="storyContext" className="form-label">
              Story Context
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.story ? "is-invalid" : ""
              }`}
              id="storyContext"
              placeholder="The story takes place in..."
              value={dialog.story}
              onChange={(e) => setDialog({ ...dialog, story: e.target.value })}
            />
            {validationErrors.story && (
              <div className="invalid-feedback">This field can't be empty.</div>
            )}
          </div>

          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="numScenes" className="form-label">
              Number of Scenes
            </label>
            <select
              id="numScenes"
              className={`form-select ${
                validationErrors.number_of_scenes ? "is-invalid" : ""
              }`}
              value={dialog.settings.number_of_scenes}
              onChange={(e) =>
                setDialog({
                  ...dialog,
                  settings: {
                    ...dialog.settings,
                    number_of_scenes: parseInt(e.target.value),
                  },
                })
              }
            >
              <option value={0}>Select number of scenes</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            {validationErrors.number_of_scenes && (
              <div className="invalid-feedback">
                Please select a number of scenes.
              </div>
            )}
          </div>

          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <label htmlFor="numCharacters" className="form-label">
              Number of Characters
            </label>
            <select
              id="numCharacters"
              className={`form-select ${
                validationErrors.number_of_characters ? "is-invalid" : ""
              }`}
              value={dialog.settings.number_of_characters}
              onChange={(e) =>
                setDialog({
                  ...dialog,
                  settings: {
                    ...dialog.settings,
                    number_of_characters: parseInt(e.target.value),
                  },
                })
              }
            >
              <option value={0}>Select number of characters</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            {validationErrors.number_of_characters && (
              <div className="invalid-feedback">
                Please select a number of characters.
              </div>
            )}
          </div>

          <div className="mb-3 box-form animate__animated animate__fadeIn">
            <div className="form-check">
              <input
                type="checkbox"
                id="toggleAttributes"
                className="form-check-input check-box"
                checked={open}
                onChange={() => setOpen(!open)}
              />
              <label className="form-check-label" htmlFor="toggleAttributes">
                Characters Attributes
              </label>
            </div>
          </div>

          <div className="mb-3 box-form animate__animated animate__fadeIn">
              <Show_json  dialog={dialog}></Show_json>
          </div>
          

          <div className={`collapse-content ${open ? "open" : ""}`}>
            <div className="card card-body">
              
              <FormCharacter
                onAddCharacter={handleAddCharacter}
                number_character={dialog.settings.number_of_characters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to create this dialog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmCreate}>
            Yes, Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormDialog;
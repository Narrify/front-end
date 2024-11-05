import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de haber importado Bootstrap Icons

export default function Show_json({ dialog }) {
  const [showModal, setShowModal] = useState(false);

  // Funciones para controlar la visibilidad del modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* Icono que abre el modal */}
      <i className="bi bi-eye " onClick={handleShow} style={{ cursor: 'pointer' , fontSize: '24px'} }  ></i>

      {/* Modal de React Bootstrap */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>JSON Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(dialog, null, 2)}</pre> {/* Pretty-print JSON */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

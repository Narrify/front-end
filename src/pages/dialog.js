import React from "react";
import Layout from "../components/Layout";
import "../styles/Dialog.css"; // Archivo CSS para estilos específicos

const Dialog = () => {
	return (
		<Layout>
			<div className="dialog-page">
				{/* Sección del formulario */}
				<div className="form-section">
					<div className="input-group">
						<label htmlFor="token">Token:</label>
						<input type="text" id="token" placeholder="Ingresa el token" className="input-field" />
					</div>

					<div className="input-group">
						<label htmlFor="json">Respuesta JSON:</label>
						<textarea id="json" rows="10" placeholder="Aquí se mostrará el JSON" className="textarea-field"></textarea>
					</div>

					<div className="button-group">
						<button type="button" className="submit-button">Enviar</button>
					</div>
				</div>

				{/* Sección para mostrar el JSON */}
				<div className="response-section">
					<h2>Respuesta JSON</h2>
					<div className="json-display">
						{/* Aquí se mostrará el JSON */}
						<p>Aquí se mostrará el JSON de respuesta.</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dialog;

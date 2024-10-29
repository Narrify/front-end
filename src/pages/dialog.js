import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Dialog.css";
import useDialog from "../hooks/useDialog";

const Dialog = () => {
	const [token, setToken] = useState("");
	const [jsonBody, setJsonBody] = useState("");
	const {response, fetchDialog} = useDialog();

	const handleSend = () => {
		if (token && jsonBody) {
			try {
				const parsedJsonBody = JSON.parse(jsonBody);
				fetchDialog(parsedJsonBody)
					.catch(error => console.error("Error al hacer la solicitud de diálogo:", error));
			} catch (error) {
				console.error("JSON inválido. Asegúrate de que el JSON esté bien formateado:", error);
				alert("JSON inválido. Asegúrate de que el JSON esté bien formateado.");
			}
		} else {
			alert("Por favor, ingrese el token y el JSON Body.");
		}
	};

	return (
		<Layout>
			<div className="dialog-page">
				<div className="form-section">
					<div className="input-group">
						<label htmlFor="token">Token:</label>
						<input
							type="text"
							id="token"
							placeholder="Ingresa el token"
							className="input-field"
							value={token}
							onChange={(e) => setToken(e.target.value)}
						/>
					</div>

					<div className="input-group">
						<label htmlFor="json">JSON Body:</label>
						<textarea
							id="json"
							rows="10"
							placeholder="JSON"
							className="textarea-field"
							value={jsonBody}
							onChange={(e) => setJsonBody(e.target.value)}
						></textarea>
					</div>

					<div className="button-group">
						<button type="button" className="submit-button" onClick={handleSend}>
							Enviar
						</button>
					</div>
				</div>

				<div className="form-section">
					<h2>Respuesta JSON</h2>
					<div className="json-display">
						{/* Renderización de la respuesta JSON */}
						{response ? (
							<pre>{JSON.stringify(response, null, 2)}</pre>
						) : (
							<p>Aquí se mostrará el JSON de respuesta.</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dialog;

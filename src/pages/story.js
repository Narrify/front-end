import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/story.css";
import useStory from "../hooks/useStory";
import withAuth from "../components/withAuth";

const Story = () => {
	const [token, setToken] = useState("");
	const [jsonBody, setJsonBody] = useState("");
	const {response, fetchStory} = useStory();
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const savedHistory = JSON.parse(localStorage.getItem("storyHistory")) || [];
		setHistory(savedHistory);
	}, []);

	const handleSend = () => {
		if (token && jsonBody) {
			try {
				const parsedJsonBody = JSON.parse(jsonBody);
				console.log("Parsed JSON Body:", parsedJsonBody);

				fetchStory(parsedJsonBody, token)
					.then(() => {
						if (response) {
							const newHistoryItem = {request: parsedJsonBody, response};
							const updatedHistory = [newHistoryItem, ...history];
							setHistory(updatedHistory);
							localStorage.setItem("storyHistory", JSON.stringify(updatedHistory));
						}
					})
					.catch(error => console.error("Error al hacer la solicitud de historia:", error));
			} catch (error) {
				console.error("JSON inválido. Asegúrate de que el JSON esté bien formateado:", error);
				alert("JSON inválido. Asegúrate de que el JSON esté bien formateado.");
			}
		} else {
			alert("Por favor, ingrese el token y el JSON Body.");
		}
	};

	const downloadJson = () => {
		if (!response) return;

		const blob = new Blob([JSON.stringify(response, null, 2)], {type: "application/json"});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "generated_story.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<Layout>
			<div className="story-page">
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
							placeholder='{"story": "A new adventure", "title": "My Story", ...}'
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

				{response && (
					<div className="response-section">
						<h2>Respuesta JSON</h2>
						<button onClick={downloadJson} className="download-button">
							Descargar JSON
						</button>
						<div className="json-display">
							<pre>{JSON.stringify(response, null, 2)}</pre>
						</div>
					</div>
				)}

				{/* History Section */}
				<div className="history-section">
					<h2>Historial de Solicitudes</h2>
					{history.length > 0 ? (
						history.map((item, index) => (
							<div key={index} className="history-item">
								<details>
									<summary>Solicitud {index + 1}</summary>
									<div className="history-details">
										<h4>Request:</h4>
										<pre>{JSON.stringify(item.request, null, 2)}</pre>
										<h4>Response:</h4>
										<pre>{JSON.stringify(item.response, null, 2)}</pre>
									</div>
								</details>
							</div>
						))
					) : (
						<p>No hay historial de solicitudes.</p>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default withAuth(Story);

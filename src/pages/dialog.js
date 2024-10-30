import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Dialog.css";
import useDialog from "../hooks/useDialog";

const Dialog = () => {
	const [token, setToken] = useState("");
	const [jsonBody, setJsonBody] = useState("");
	const { response, fetchDialog } = useDialog();

	const handleSend = () => {
		if (token && jsonBody) {
			try {
				const parsedJsonBody = JSON.parse(jsonBody);
				fetchDialog(parsedJsonBody, token)
					.catch(error => console.error("Error making dialog request:", error));
			} catch (error) {
				console.error("Invalid JSON. Make sure the JSON is properly formatted:", error);
				alert("Invalid JSON. Make sure the JSON is properly formatted.");
			}
		} else {
			alert("Please enter the token and JSON Body.");
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
							placeholder="Enter the token"
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
							placeholder="Enter JSON"
							className="textarea-field"
							value={jsonBody}
							onChange={(e) => setJsonBody(e.target.value)}
						></textarea>
					</div>

					<div className="button-group">
						<button type="button" className="submit-button" onClick={handleSend}>
							Send
						</button>
					</div>
				</div>

				<div className="form-section">
					<h2 style={{color : "white"}}>JSON Response</h2>
					<div className="json-display">
						{response ? (
							<pre>{JSON.stringify(response, null, 2)}</pre>
						) : (
							<p>The JSON response will be displayed here.</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dialog;

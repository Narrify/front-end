import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/story.css";
import useStory from "../Hooks/useStory"; // Assuming a hook similar to `useDialog`

const Story = () => {
    const [token, setToken] = useState("");
    const [jsonBody, setJsonBody] = useState("");
    const { response, fetchStory } = useStory();

    const handleSend = () => {
        if (token && jsonBody) {
            try {
                const parsedJsonBody = JSON.parse(jsonBody);
                fetchStory(parsedJsonBody, token)
                    .catch(error => console.error("Error fetching story:", error));
            } catch (error) {
                console.error("Invalid JSON format:", error);
                alert("Invalid JSON format. Please check your input.");
            }
        } else {
            alert("Please enter both the token and JSON body.");
        }
    };

    const downloadResponse = () => {
        if (response) {
            const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'response.json';
            a.click();
            URL.revokeObjectURL(url);
        }
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
                            placeholder="Enter your token"
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

                <div className="response-section">
                    <h2>JSON Response</h2>
                    <div className="json-display">
                        {response ? (
                            <>
                                <pre>{JSON.stringify(response, null, 2)}</pre>
                                <button onClick={downloadResponse} className="download-button">
                                    Download JSON
                                </button>
                            </>
                        ) : (
                            <p>The JSON response will appear here.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Story;

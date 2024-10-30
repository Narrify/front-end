// History.js
import React, { useState } from "react";
import Layout from "../components/Layout";
import useHistory from "../hooks/useHistory";
import PromptList from "../components/PromptList";
import Modal from "../components/Modal";

const History = () => {
	const [token, setToken] = useState("");
	const { prompts, fetchHistory, error } = useHistory();
	const [selectedPrompt, setSelectedPrompt] = useState(null);

	const handleFetchHistory = () => {
		if (token.trim()) {
			fetchHistory(token);
		} else {
			alert("Please enter a valid token.");
		}
	};

	// Close the modal
	const closeModal = () => {
		setSelectedPrompt(null);
	};

	return (
		<Layout>
			<div className="max-w-2xl mx-auto p-6 my-20">
				<h1 className="text-2xl font-bold mb-6">Prompt History</h1>

				<div className="flex flex-col space-y-4 mb-8">
					<input
						type="text"
						placeholder="Enter JWT token"
						value={token}
						onChange={(e) => setToken(e.target.value)}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<button
						onClick={handleFetchHistory}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
					>
						Fetch History
					</button>
				</div>

				<div>
					{error && <p className="text-red-500">{error}</p>}
					<PromptList prompts={prompts} onPromptClick={setSelectedPrompt} />
				</div>

			</div>
		</Layout>
	);
};

export default History;

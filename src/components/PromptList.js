// PromptList.js
import React, { useState } from "react";
import Modal from "./Modal";

const PromptList = ({ prompts }) => {
	const [selectedPrompt, setSelectedPrompt] = useState(null);

	const handlePromptClick = (prompt) => {
		setSelectedPrompt(prompt);
	};

	const closeModal = () => {
		setSelectedPrompt(null);
	};

	return (
		<div className="prompt-list">
			<h2 className="text-xl font-semibold mb-4">Prompt History</h2>
			<ul className="space-y-2">
				{prompts.map((prompt, index) => (
					<li
						key={index}
						className="cursor-pointer bg-gray-400 border-gray-300 p-2 rounded-lg hover:bg-gray-300"
						onClick={() => handlePromptClick(prompt)}
					>
						Prompt #{index + 1}
					</li>
				))}
			</ul>

			{selectedPrompt && (
				<Modal prompt={selectedPrompt} onClose={closeModal} />
			)}
		</div>
	);
};

export default PromptList;

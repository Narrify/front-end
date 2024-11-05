import React, { useState } from "react";
import Modal from "./Modal";

const ResponseList = ({ responses }) => {
	const [selectedResponse, setSelectedResponse] = useState(null);

	const handleResponseClick = (response) => {
		setSelectedResponse(response);
	};

	const closeModal = () => {
		setSelectedResponse(null);
	};

	return (
		<div className="response-list">
			<h1 className="text-3xl font-semibold mb-4">History</h1>
			<ul className="space-y-2">
				{responses.map((response, index) => (
					<li
						key={index}
						className="cursor-pointer bg-[#AE469E] text-[#EEEEEE] p-2 rounded-lg hover:bg-pink-600 border border-transparent hover:border-pink-400 transition-colors duration-300"
						onClick={() => handleResponseClick(response)}
					>
						Response #{index + 1}
					</li>
				))}
			</ul>

			{selectedResponse && (
				<Modal response={selectedResponse} onClose={closeModal} />
			)}
		</div>
	);
};

export default ResponseList;

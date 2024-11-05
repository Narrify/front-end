import React from "react";

const Modal = ({ prompt, onClose }) => (
	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
		<div className="bg-white p-4 rounded-lg shadow-lg w-80 max-h-[60vh] overflow-y-auto">
			<button
				className="text-gray-500 float-right mb-2 text-sm"
				onClick={onClose}
			>
				Close
			</button>
			<h3 className="text-base font-semibold mb-3">Prompt Details</h3>
			
			<div className="p-2 bg-gray-100 border border-gray-300 rounded-lg max-h-50 overflow-y-scroll">
				<pre className="text-gray-800 whitespace-pre-wrap text-xs leading-tight">
					{JSON.stringify(prompt, null, 2)}
				</pre>
			</div>
		</div>
	</div>
);

export default Modal;

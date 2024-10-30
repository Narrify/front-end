import { useState } from "react";
import axios from "axios";

const useHistory = () => {
	const [prompts, setPrompts] = useState([]);
	const [error, setError] = useState(null);

	const fetchHistory = async (token) => {
		try {
			const response = await axios.get("http://127.0.0.1:8001/prompts/get", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPrompts(response.data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch prompt history.");
			setPrompts([]);
			console.error("Error fetching history:", err);
		}
	};

	return { prompts, fetchHistory, error };
};

export default useHistory;

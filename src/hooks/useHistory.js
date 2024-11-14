import { useState } from "react";
import axios from "axios";

const useHistory = () => {
	const [responses, setResponses] = useState([]);
	const [error, setError] = useState(null);

	const fetchHistory = async (token) => {
		try {
			const response = await axios.get("http://narrify.dev/prompts/get", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setResponses(response.data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch response history.");
			setResponses([]);
			console.error("Error fetching history:", err);
		}
	};

	return { responses, fetchHistory, error };
};

export default useHistory;

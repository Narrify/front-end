import { useState } from "react";
import axios from "axios";

const useStory = () => {
	const [response, setResponse] = useState(null);

	const fetchStory = async (parsedJsonBody, token) => {
		console.log("Sending JSON:", parsedJsonBody);

		try {
			const result = await axios.post(
				"http://narrify.dev/generate/story",
				parsedJsonBody,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("result data:", result.data);
			setResponse(result.data);
		} catch (error) {
			setResponse(null);
			console.error("Error fetching story:", error);

			if (error.response) {
				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
				console.error("Response headers:", error.response.headers);
			}
		}
	};

	return {response, fetchStory};
};

export default useStory;

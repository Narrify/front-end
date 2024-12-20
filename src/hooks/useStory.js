import { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const useStory = () => {
	const [response, setResponse] = useState(null);
	
	const fetchStory = async (json, token) => {
		try {
			const result = await axios.post(
				"https://narrify.dev/generate/story",
				json,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setResponse(result.data);
		} catch (error) {
			setResponse(null);
			console.error("Error fetching story:", error);
			navigate("/404");
		}
	};

	return { response, fetchStory };
};

export default useStory;

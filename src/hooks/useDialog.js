import { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const useDialog = () => {
	const [response, setResponse] = useState(null);

	const fetchDialog = async (json, token) => {
		try {
			console.log("awaiting post");
			console.log("json", json);

			const result = await axios.post(
				"http://127.0.0.1:8001/generate/dialog",
				json,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("post completed");
			console.log("result data:", result.data);

			setResponse(result.data);

		} catch (error) {
			setResponse(null);
			console.log("Request error:", error);
			navigate("/404");
		}
	};

	return { response, fetchDialog };
};

export default useDialog;

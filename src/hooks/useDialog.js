import { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const useDialog = () => {
	const [response, setResponse] = useState(null);

	const fetchDialog = async (json, token) => {
		try {
			const result = await axios.post(
				"http://k8s-default-ingressn-3e4c502731-1968576031.us-east-1.elb.amazonaws.com/generate/dialog",
				json,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setResponse(result.data);

		} catch (error) {
			setResponse(null);
			console.error("Error fetching dialog:", error);
			navigate("/404");
		}
	};

	return { response, fetchDialog };
};

export default useDialog;

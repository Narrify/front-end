import { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const useStory = () => {
	const [response, setResponse] = useState(null);
	
	const fetchStory = async (json, token) => {
		try {
			const result = await axios.post(
				"http://k8s-default-ingressn-3e4c502731-1860817238.us-east-1.elb.amazonaws.com/generate/story",
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

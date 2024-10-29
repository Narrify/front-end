import { useState } from "react";
import axios from "axios";

const useStory = () => {
    const [response, setResponse] = useState(null);

    const fetchStory = async (parsedJsonBody, token) => {
        console.log("Sending JSON:", parsedJsonBody); // Log to verify structure

        try {
            const result = await axios.post(
                "http://127.0.0.1:8001/generate/story",
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

            // If there's a response error, log the response
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
    };

    return { response, fetchStory };
};

export default useStory;

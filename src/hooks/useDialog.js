import { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const useDialog = () => {
	const [response, setResponse] = useState(null);

	const fetchDialog = async (json) => {
		try {
			console.log("await post");
			console.log("json", json);

			const result = await axios.post(
				"http://127.0.0.1:8000/generate/dialog",
				json // Enviar el JSON como objeto
			);

			console.log("end post");
			console.log("result data:", result.data);

			// Accede a result.data.response según la estructura de la respuesta
			setResponse(result.data.response);
			console.log("result data:", result.data.response);


		} catch (error) {
			setResponse(null);
			console.log("Error en la solicitud:", error);
			navigate("/404");
		}
	};

	return {response, fetchDialog};
};

export default useDialog;

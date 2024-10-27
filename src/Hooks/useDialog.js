import { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from "gatsby";


const useDialog = (Token, Json) => {
    const [response, setResponse] = useState(null); // Corrección en el nombre de la variable

    useEffect(() => {
        const fetchDialog = async () => {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/generate/dialog`, 
                    Json, // Enviar el JSON en el cuerpo de la solicitud
                    {
                        headers: {
                            'Authorization': `Bearer ${Token}` // Enviar el token en el header
                        }
                    }
                );
                setResponse(response.data.body); // Corrección en el nombre de la variable
            } catch (error) {
                setResponse(null); // Corrección en el nombre de la variable
                console.log("fallo 404  aqui")
                navigate('/404'); // Redirige a la página 404 en caso de error
            }
        };

        fetchDialog(); // Llamada a la función fetchDialog
    }, [Token, Json]); // Escucha cambios en Token y Json

    return { response };
};

export default useDialog;

import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Dialog.css";
import useDialog from "../Hooks/useDialog";
import Header from "./d_Barra";
const Dialog = () => {
    const [token, setToken] = useState("");
    const [jsonBody, setJsonBody] = useState("");
    const { response, fetchDialog } = useDialog();

    const handleSend = () => {
        if (token && jsonBody) {
            try {
                const parsedJsonBody = JSON.parse(jsonBody);
                fetchDialog(parsedJsonBody)
                    .catch(error => console.error("Error al hacer la solicitud de diálogo:", error));
            } catch (error) {
                console.error("JSON inválido. Asegúrate de que el JSON esté bien formateado:", error);
                alert("JSON inválido. Asegúrate de que el JSON esté bien formateado.");
            }
        } else {
            alert("Por favor, ingrese el token y el JSON Body.");
        }
    };

    return (
        <Layout>
            
           <Header/>
          
        </Layout>
    );
};

export default Dialog;

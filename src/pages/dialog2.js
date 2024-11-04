import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Dialog.css"; // Tu archivo de estilos personalizado si necesitas más estilos

const Dialog = () => {
    const [storyContext, setStoryContext] = useState("");
    const [story, setStory] = useState("");
    const [numCharacters, setNumCharacters] = useState(1);
    const [characters, setCharacters] = useState([{ name: "", personality: "" }]);

    const addCharacter = () => {
        setCharacters([...characters, { name: "", personality: "" }]);
    };

    const handleCharacterChange = (index, field, value) => {
        const newCharacters = [...characters];
        newCharacters[index][field] = value;
        setCharacters(newCharacters);
    };

    const handleSubmit = () => {
        // Maneja el envío de datos, ejemplo con una alerta
        alert("Dialog created!");
    };


    return (
        <Layout>
            <div className="dialog-page  mt-5 bo-r">
                





            </div>
        </Layout>
    );
};

export default Dialog;

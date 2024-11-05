import React, { useState } from "react";
import "../styles/Dialog.css";
import { MdAddCircleOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import 'animate.css';

export default function Component({ onAddCharacter, number_character }) { // Recibe number_character
  const [character, setCharacter] = useState({
    name: "",
    attributes: [
      { name: "Personality", value: "" }
    ]
  });
  const [message, setMessage] = useState("");
  const [characterCount, setCharacterCount] = useState(0); // Estado para contar personajes agregados

  const handleNameChange = (e) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: e.target.value,
    }));
  };

  const handlePersonalityChange = (e) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: [
        { ...prevCharacter.attributes[0], value: e.target.value }
      ]
    }));
  };

  const handleAddCharacter = () => {
    if (characterCount < number_character) { // Verifica si el límite se ha alcanzado
      onAddCharacter(character); // Envía datos al componente padre solo si el límite no se alcanza
      setCharacterCount(characterCount + 1); // Incrementa el contador
  
      setCharacter({ // Limpia los campos de entrada
        name: "",
        attributes: [
          { name: "Personality", value: "" }
        ]
      });
      setMessage("Character added!");
      setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    } else {
      setMessage("Character limit reached!"); // Muestra mensaje si se alcanza el límite
      setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    }
  };
  

  return (
    <div className="character-atributes">
      <div className="mb-3 box-character">
        <GoPerson size={40} />
      </div>
      <div className="mb-3 box-character">
        <label htmlFor="characterName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="characterName"
          value={character.name}
          placeholder="Pablo Escobar"
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3 box-character">
        <label className="form-label">
          Personality
        </label>
        <input
          type="text"
          className="form-control"
          id="characterPersonality"
          placeholder="friendly, funny"
          value={character.attributes[0].value}
          onChange={handlePersonalityChange}
        />
      </div>
      <div className="mb-3 box-character back-btn">
        <MdAddCircleOutline size={40} onClick={handleAddCharacter} />
      </div>
      {message && <div className="message">{message}</div>} {/* Display message */}
    </div>
  );
}

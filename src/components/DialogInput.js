import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Button, Label, TextInput, Card } from 'flowbite-react'
import useDialog from "../hooks/useDialog";

export default function DialogInput() {
  const { response, fetchDialog } = useDialog();
  const [formData, setFormData] = useState({
    story: '',
    settings: {
      number_of_scenes: 1,
      number_of_characters: 1
    },
    characters: [
      {
        name: '',
        attributes: [{ key: '', value: '' }]
      }
    ]
  });

  const handleInputChange = (e, index = null, attrIndex = null) => {
    const { name, value } = e.target;
    if (index === null) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (attrIndex === null) {
      setFormData(prev => {
        const newCharacters = [...prev.characters];
        newCharacters[index] = { ...newCharacters[index], [name]: value };
        return { ...prev, characters: newCharacters };
      });
    } else {
      setFormData(prev => {
        const newCharacters = [...prev.characters];
        newCharacters[index].attributes[attrIndex] = { ...newCharacters[index].attributes[attrIndex], [name]: value };
        return { ...prev, characters: newCharacters };
      });
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      settings: { ...prev.settings, [name]: parseInt(value) || 0 }
    }));
  };

  const addCharacter = () => {
    setFormData(prev => ({
      ...prev,
      characters: [...prev.characters, { name: '', attributes: [{ key: '', value: '' }] }]
    }));
  };

  const removeCharacter = (index) => {
    setFormData(prev => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== index)
    }));
  };

  const addAttribute = (characterIndex) => {
    setFormData(prev => {
      const newCharacters = [...prev.characters];
      newCharacters[characterIndex].attributes.push({ key: '', value: '' });
      return { ...prev, characters: newCharacters };
    });
  };

  const removeAttribute = (characterIndex, attrIndex) => {
    setFormData(prev => {
      const newCharacters = [...prev.characters];
      newCharacters[characterIndex].attributes = newCharacters[characterIndex].attributes.filter((_, i) => i !== attrIndex);
      return { ...prev, characters: newCharacters };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AuthToken");

    if (token) {
      await fetchDialog(formData, token);
    }
  };

  useEffect(() => {
    if (response) {
      navigate("/dialogresult", { state: { response: response } });
    }
  }, [response]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4 sm:mt-[5vh] md:mt-[7vh] lg:mt-[10vh]">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dialog Details
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Enter the main story and settings
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="story" value="Story" />
            <TextInput
              id="story"
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number_of_scenes" value="Number of Scenes" />
              <TextInput
                id="number_of_scenes"
                name="number_of_scenes"
                type="number"
                value={formData.settings.number_of_scenes}
                onChange={handleSettingsChange}
                min={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="number_of_characters" value="Number of Characters" />
              <TextInput
                id="number_of_characters"
                name="number_of_characters"
                type="number"
                value={formData.settings.number_of_characters}
                onChange={handleSettingsChange}
                min={1}
                required
              />
            </div>
          </div>
        </div>
      </Card>

      {formData.characters.map((character, index) => (
        <Card key={index}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Character {index + 1}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Enter character details
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`character-name-${index}`} value="Name" />
              <TextInput
                id={`character-name-${index}`}
                name="name"
                value={character.name}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
            </div>
            {character.attributes.map((attr, attrIndex) => (
              <div key={attrIndex} className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor={`attr-name-${index}-${attrIndex}`} value="Attribute Name" />
                  <TextInput
                    id={`attr-name-${index}-${attrIndex}`}
                    name="name"
                    value={attr.name}
                    onChange={(e) => handleInputChange(e, index, attrIndex)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`attr-value-${index}-${attrIndex}`} value="Attribute Value" />
                  <TextInput
                    id={`attr-value-${index}-${attrIndex}`}
                    name="value"
                    value={attr.value}
                    onChange={(e) => handleInputChange(e, index, attrIndex)}
                    required
                  />
                </div>
                {attrIndex > 0 && (
                  <Button
                    color="failure"
                    size="sm"
                    onClick={() => removeAttribute(index, attrIndex)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button color="gray" onClick={() => addAttribute(index)}>
              Add Attribute
            </Button>
          </div>
          {index > 0 && (
            <div className="flex justify-end mt-4">
              <Button color="failure" onClick={() => removeCharacter(index)}>
                Remove Character
              </Button>
            </div>
          )}
        </Card>
      ))}

      <div className="flex justify-between">
        <Button color="gray" onClick={addCharacter}>
          Add Character
        </Button>
        <Button type="submit" color="dark">
          Generate
        </Button>
      </div>
    </form>
  );
}

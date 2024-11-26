import React, { useState, useEffect } from 'react'
import { navigate } from "gatsby";
import { Button, Label, TextInput, Card, Select } from 'flowbite-react'
import useStory from '../hooks/useStory';

export default function StoryInput() {
  const { response, fetchStory } = useStory();
  const [formData, setFormData] = useState({
    title: "",
    settings: {
      size: "medium",
      attributes: []
    },
    characters: []
  })

  const handleInputChange = (e, section = null, index = null, attrIndex = null) => {
    const { name, value } = e.target
    setFormData((prev) => {
      if (section === null) {
        return { ...prev, [name]: value }
      } else if (section === 'settings') {
        if (name === 'size') {
          return { ...prev, settings: { ...prev.settings, size: value } }
        }
        const newAttributes = [...prev.settings.attributes]
        if (attrIndex !== null) {
          newAttributes[attrIndex] = { ...newAttributes[attrIndex], [name]: value }
        }
        return {
          ...prev,
          settings: {
            ...prev.settings,
            attributes: newAttributes,
          },
        }
      } else if (section === 'characters') {
        const newCharacters = [...prev.characters]
        if (attrIndex === null) {
          newCharacters[index] = { ...newCharacters[index], [name]: value }
        } else {
          newCharacters[index].attributes[attrIndex] = { ...newCharacters[index].attributes[attrIndex], [name]: value }
        }
        return { ...prev, characters: newCharacters }
      }
    })
  }

  const addCharacter = () => {
    setFormData(prev => ({
      ...prev,
      characters: [...prev.characters, { key: '', attributes: [] }]
    }))
  }

  const removeCharacter = (index) => {
    setFormData(prev => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== index)
    }))
  }

  const addAttribute = (section, index = null) => {
    if (section === 'settings') {
      setFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          attributes: [...prev.settings.attributes, { key: "", value: "" }]
        }
      }))
    } else if (section === 'characters') {
      setFormData(prev => {
        const newCharacters = [...prev.characters]
        newCharacters[index].attributes.push({ key: "", value: "" })
        return { ...prev, characters: newCharacters }
      })
    }
  }

  const removeAttribute = (section, index, attrIndex) => {
    if (section === 'settings') {
      setFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          attributes: prev.settings.attributes.filter((_, i) => i !== attrIndex)
        }
      }))
    } else if (section === 'characters') {
      setFormData(prev => {
        const newCharacters = [...prev.characters]
        newCharacters[index].attributes = newCharacters[index].attributes.filter((_, i) => i !== attrIndex)
        return { ...prev, characters: newCharacters }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("AuthToken");

    if (token) {
      await fetchStory(formData, token);
    }


  };

  useEffect(() => {
    if (response) {
      navigate("/storyresult", { state: { response: response } });
    }
  }, [response]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4 sm:mt-[5vh] md:mt-[7vh] lg:mt-[10vh]">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Story Details
        </h5>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="size" value="Size" />
            <Select
              id="size"
              name="size"
              value={formData.settings.size}
              onChange={(e) => handleInputChange(e, 'settings')}
              required
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
          </div>
          <div>
            <Label value="Setting Attributes" />
            {formData.settings.attributes.map((attr, attrIndex) => (
              <div key={attrIndex} className="grid grid-cols-2 gap-4 items-end mt-2">
                <TextInput
                  name="name"
                  value={attr.name}
                  onChange={(e) => handleInputChange(e, 'settings', null, attrIndex)}
                  placeholder="E.g: genre, type, etc."
                  required
                />
                <div className="flex items-center gap-2">
                  <TextInput
                    name="value"
                    value={attr.value}
                    onChange={(e) => handleInputChange(e, 'settings', null, attrIndex)}
                    placeholder="E.g: mystery, detective story, etc."
                    required
                  />
                  <Button
                    color="failure"
                    size="sm"
                    onClick={() => removeAttribute('settings', null, attrIndex)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button color="gray" size="sm" onClick={() => addAttribute('settings')} className="mt-2">
              Add Setting Attribute
            </Button>
          </div>
        </div>
      </Card>

      {formData.characters.map((character, index) => (
        <Card key={index}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Character {index + 1}
          </h5>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`character-name-${index}`} value="Name" />
              <TextInput
                id={`character-name-${index}`}
                name="name"
                value={character.name}
                onChange={(e) => handleInputChange(e, 'characters', index)}
                required
              />
            </div>
            <div>
              <Label value="Character Attributes" />
              {character.attributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="grid grid-cols-2 gap-4 items-end mt-2">
                  <TextInput
                    name="name"
                    value={attr.name}
                    onChange={(e) => handleInputChange(e, 'characters', index, attrIndex)}
                    placeholder="E.g: trait, personality, etc."
                    required
                  />
                  <div className="flex items-center gap-2">
                    <TextInput
                      name="value"
                      value={attr.value}
                      onChange={(e) => handleInputChange(e, 'characters', index, attrIndex)}
                      placeholder="E.g: charismatic, extroverted, etc."
                      required
                    />
                    <Button
                      color="failure"
                      size="sm"
                      onClick={() => removeAttribute('characters', index, attrIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button color="gray" size="sm" onClick={() => addAttribute('characters', index)} className="mt-2">
                Add Character Attribute
              </Button>
            </div>
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
  )
}

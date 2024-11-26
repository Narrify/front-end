import React from 'react'
import { Accordion, Card, Badge } from 'flowbite-react'

const DialogLine = ({ character, line }) => (
  <div className="mb-2">
    <span className="font-semibold text-blue-600">{character}: </span>
    <span>{line}</span>
  </div>
)

const DialogHistoryVisualizer = ({ dialogs }) => {

  return (
    <div className="w-full">
      <Accordion>
        {dialogs.map((story, storyIndex) => (
          <Accordion.Panel key={story.id}>
            <Accordion.Title className="text-xl font-bold">
              Dialog {storyIndex + 1}
            </Accordion.Title>
            <Accordion.Content>
              {story.response.map((scene) => (
                <Card key={scene.scene_number} className="mb-4">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    Scene {scene.scene_number}
                  </h5>
                  <div className="space-y-2">
                    {scene.dialogues.map((dialogue, index) => (
                      <DialogLine key={index} character={dialogue.character} line={dialogue.line} />
                    ))}
                  </div>
                  <div className="mt-4">
                    <h6 className="text-sm font-semibold mb-2">Characters in this scene:</h6>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(scene.dialogues.map(d => d.character))).map((character, index) => (
                        <Badge key={index} color="info">
                          {character}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default DialogHistoryVisualizer;
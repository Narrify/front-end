import React from 'react'
import { Accordion, Card, Badge } from 'flowbite-react'

const StorySection = ({ title, content }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p>{content}</p>
  </div>
)

const StoryHistoryVisualizer = ({ stories }) => {
  
  return (
    <div className="w-full">
      <Accordion>
        {stories.map((story, index) => (
          <Accordion.Panel key={story.id}>
            <Accordion.Title className="text-xl font-bold">
              {story.response.title || `Story ${index + 1}`}
            </Accordion.Title>
            <Accordion.Content>
              <Card>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                  {story.response.title}
                </h5>
                <div className="mb-4">
                  <h6 className="text-lg font-semibold mb-2">Characters:</h6>
                  <div className="flex flex-wrap gap-2">
                    {story.response.characters.map((character, charIndex) => (
                      <Badge key={charIndex} color="info">
                        {character}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <StorySection title="Introduction" content={story.response.story.introduction} />
                  <StorySection title="Conflict" content={story.response.story.conflict} />
                  <StorySection title="Rising Action" content={story.response.story.rising_action} />
                  <StorySection title="Climax" content={story.response.story.climax} />
                  <StorySection title="Falling Action" content={story.response.story.falling_action} />
                  <StorySection title="Resolution" content={story.response.story.resolution} />
                </div>
              </Card>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
};

export default StoryHistoryVisualizer;
import React, { useState, useEffect } from 'react'
import { Button } from 'flowbite-react'
import StoryHistoryVisualizer from './StoryHistoryVisualizer'
import DialogHistoryVisualizer from './DialogHistoryVisualizer'
import { useFetchHistoryData } from '../hooks/useFetchHistoryData'

const HistoryComponent = () => {
    const [activeView, setActiveView] = useState('story')
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("AuthToken");
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.error("No token found. Please log in.");
        }
    }, []);

    const { stories, dialogs, loading } = useFetchHistoryData(token);

    if (!stories || stories.length === 0 || !dialogs || dialogs.length === 0) {
        return <div>No history available.</div>
    }

    return (
        <div className="w-full sm:mt-[5vh] md:mt-[7vh] lg:mt-[10vh]">
            <div className="flex justify-center mb-4">
                <div className="flex space-x-4">
                    <Button
                        color={activeView === 'story' ? 'pink' : 'gray'}
                        onClick={() => setActiveView('story')}
                    >
                        Story History
                    </Button>
                    <Button
                        color={activeView === 'dialog' ? 'pink' : 'gray'}
                        onClick={() => setActiveView('dialog')}
                    >
                        Dialog History
                    </Button>
                </div>
            </div>

            {activeView === 'story' ? (
                <StoryHistoryVisualizer stories={stories} />
            ) : (
                <DialogHistoryVisualizer dialogs={dialogs} />
            )}
        </div>
    )
}

export default HistoryComponent

import React, { useState } from 'react';
import Layout from "../components/Layout";
import { Card, Button, Modal, Badge } from 'flowbite-react'

const StoryResult = ({ location }) => {
    const response = location.state?.response;
    const [showJsonModal, setShowJsonModal] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)

    const copyJsonToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(response, null, 2))
            .then(() => {
                setCopySuccess(true)
                setTimeout(() => setCopySuccess(false), 2000)
            })
            .catch(err => {
                console.error('Failed to copy JSON: ', err)
            })
    }

    return (
        <Layout>
            {response ? (
                <div className="container mx-auto px-4 py-8 sm:mt-[5vh] md:mt-[7vh] lg:mt-[10vh]">
                    <h1 className="text-4xl font-bold mb-8 text-center">{response.title}</h1>

                    <Button onClick={() => setShowJsonModal(true)} className="mb-4">
                        View Full JSON
                    </Button>

                    <Card className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Characters</h2>
                        <div className="flex flex-wrap gap-2">
                            {response.characters.map((character, index) => (
                                <Badge key={index} color="info" size="lg">
                                    {character}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    <div className="space-y-8">
                        {Object.entries(response.story).map(([key, value]) => (
                            <Card key={key}>
                                <h2 className="text-2xl font-semibold mb-4 capitalize">{key.replace('_', ' ')}</h2>
                                <p className="text-gray-700 dark:text-gray-400">{value}</p>
                            </Card>
                        ))}
                    </div>

                    <Modal show={showJsonModal} onClose={() => setShowJsonModal(false)}>
                        <Modal.Header>Full JSON Data</Modal.Header>
                        <Modal.Body>
                            <div className="relative">
                                <pre className="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded-lg overflow-x-auto max-h-96">
                                    {JSON.stringify(response, null, 2)}
                                </pre>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={copyJsonToClipboard}>
                                {copySuccess ? 'Copied!' : 'Copy JSON'}
                            </Button>
                            <Button color="gray" onClick={() => setShowJsonModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : (
                <p>No response available</p>
            )}
        </Layout>
    );
};

export default StoryResult;

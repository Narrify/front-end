import React, { useState } from 'react';
import Layout from "../components/Layout";
import { Card, Accordion, Button, Modal } from 'flowbite-react'

const DialogResult = ({ location }) => {
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
                    <h1 className="text-4xl font-bold mb-8 text-center">Dialog Scenes</h1>

                    <Button onClick={() => setShowJsonModal(true)} className="mb-4">
                        View Full JSON
                    </Button>

                    <Accordion collapseAll>
                        {response.map((scene) => (
                            <Accordion.Panel key={scene.scene_number}>
                                <Accordion.Title>Scene {scene.scene_number}</Accordion.Title>
                                <Accordion.Content>
                                    <Card>
                                        {scene.dialogues.map((line, index) => (
                                            <div key={index} className="mb-4">
                                                <span className="font-bold text-blue-600">{line.character}: </span>
                                                <span>{line.line}</span>
                                            </div>
                                        ))}
                                    </Card>
                                </Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>

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

export default DialogResult;

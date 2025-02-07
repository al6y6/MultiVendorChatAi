import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [theme, setTheme] = useState('light');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPlanPopupOpen, setIsPlanPopupOpen] = useState(false);
    const [apiKeys, setApiKeys] = useState({});
    const chatContainerRef = useRef();

    useEffect(() => {
        document.documentElement.className = `theme-${theme}`;
        const savedKeys = loadApiKeys();
        setApiKeys(savedKeys);
    }, [theme]);

    const handleSendMessage = async (message, vendor) => {
        try {
            if (!apiKeys[vendor]) {
                setMessages(prev => [...prev, { 
                    content: "Please set up your API key in settings first.", 
                    isAi: true 
                }]);
                setIsSidebarOpen(true);
                return;
            }

            setMessages(prev => [...prev, { content: message, isAi: false }]);
            const response = await sendMessageToVendor(message, vendor, apiKeys[vendor]);
            setMessages(prev => [...prev, { content: response, isAi: true }]);
            
            // Auto scroll to bottom
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { 
                content: "Sorry, there was an error processing your message.", 
                isAi: true 
            }]);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            const result = await processFileUpload(file);
            return result;
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { 
                content: "Sorry, there was an error uploading your file.", 
                isAi: true 
            }]);
        }
    };

    return (
        <div className="app">
            <header>
                <h1>AI Chat Application</h1>
            </header>
            <main>
                <div className="chat-container" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.isAi ? 'ai' : 'user'}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;

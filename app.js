function App() {
    const [messages, setMessages] = React.useState([]);
    const [theme, setTheme] = React.useState('light');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isPlanPopupOpen, setIsPlanPopupOpen] = React.useState(false);
    const [apiKeys, setApiKeys] = React.useState({});
    const chatContainerRef = React.useRef();

    React.useEffect(() => {
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
            reportError(error);
            setMessages(prev => [...prev, { 
                content: "Sorry, there was an error processing your message.", 
                isAi: true 
            }]);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            return await handleFileUpload(file);
        } catch (error) {
            reportError(error);
            setMessages(prev => [...prev, { 
                content: "Sorry, there was an error uploading your file.", 
                isAi: true 
            }]);
            throw error;
        }
    };

    const handleRefreshChat = () => {
        setMessages([]);
    };

    const handleUpdateApiKey = (vendor, key) => {
        setApiKeys(prev => ({
            ...prev,
            [vendor]: key
        }));
        saveApiKey(vendor, key);
    };

    return (
        <div className="h-screen flex flex-col chat-container" data-name="app-container">
            <Header 
                onThemeChange={setTheme} 
                onRefreshChat={handleRefreshChat}
                onOpenSettings={() => setIsSidebarOpen(true)}
                onOpenPlan={() => setIsPlanPopupOpen(true)}
            />
            <div 
                className="flex-1 overflow-y-auto p-2 sm:p-4 relative" 
                ref={chatContainerRef} 
                data-name="chat-container"
            >
                {messages.length === 0 ? (
                    <WelcomeMessage />
                ) : (
                    messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            message={message.content}
                            isAi={message.isAi}
                        />
                    ))
                )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
                <div className="space-y-6">
                    <ApiKeyManager 
                        apiKeys={apiKeys}
                        onUpdateApiKey={handleUpdateApiKey}
                    />
                    <ThemeSelector 
                        currentTheme={theme}
                        onThemeChange={setTheme}
                    />
                </div>
            </Sidebar>
            <PlanPopup 
                isOpen={isPlanPopupOpen}
                onClose={() => setIsPlanPopupOpen(false)}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

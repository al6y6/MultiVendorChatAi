function ChatMessage({ message, isAi }) {
    function renderMarkdown(content) {
        try {
            const html = marked.parse(content);
            return { __html: html };
        } catch (error) {
            reportError(error);
            return { __html: content };
        }
    }

    React.useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }, [message]);

    return (
        <div className={`message-container p-4 rounded-lg my-2 ${isAi ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`} data-name="chat-message">
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                    <i className={`fas ${isAi ? 'fa-robot' : 'fa-user'}`}></i>
                </div>
                <div className="flex-1 markdown-content" dangerouslySetInnerHTML={renderMarkdown(message)} />
            </div>
        </div>
    );
}

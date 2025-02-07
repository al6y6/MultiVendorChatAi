function ChatInput({ onSendMessage, onFileUpload }) {
    const [message, setMessage] = React.useState('');
    const [selectedVendor, setSelectedVendor] = React.useState('openai');
    const [isUploading, setIsUploading] = React.useState(false);
    const fileInputRef = React.useRef();

    const vendors = [
        { value: 'openai', label: 'OpenAI' },
        { value: 'anthropic', label: 'Anthropic' },
        { value: 'google', label: 'Google AI' },
        { value: 'deepseek', label: 'DeepSeek' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message, selectedVendor);
            setMessage('');
        }
    };

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                setIsUploading(true);
                const result = await onFileUpload(file);
                if (result) {
                    setMessage(prev => prev + `\nFile content: ${result}`);
                }
            }
        } catch (error) {
            reportError(error);
            alert('Error uploading file: ' + error.message);
        } finally {
            setIsUploading(false);
            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-4" data-name="chat-input">
            <div className="max-w-4xl mx-auto">
                <div className="relative flex items-center">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full p-2 sm:p-4 pr-24 sm:pr-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm sm:text-base"
                        rows="1"
                        data-name="message-input"
                    />
                    <div className="absolute right-2 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            disabled={isUploading}
                            data-name="upload-button"
                        >
                            {isUploading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-paperclip"></i>
                            )}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".txt,.md,.json,.csv"
                            data-name="file-input"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                            data-name="send-button"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-2 flex justify-end">
                    <select
                        value={selectedVendor}
                        onChange={(e) => setSelectedVendor(e.target.value)}
                        className="px-2 py-1 sm:px-3 sm:py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600"
                        data-name="vendor-selector"
                    >
                        {vendors.map(vendor => (
                            <option key={vendor.value} value={vendor.value}>{vendor.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    );
}

function ApiKeyManager({ apiKeys, onUpdateApiKey }) {
    const vendors = [
        { 
            id: 'openai',
            name: 'OpenAI',
            placeholder: 'sk-...',
            helpText: 'Enter your OpenAI API key'
        },
        { 
            id: 'anthropic',
            name: 'Anthropic',
            placeholder: 'sk-ant-...',
            helpText: 'Enter your Anthropic API key'
        },
        { 
            id: 'google',
            name: 'Google AI',
            placeholder: 'AIza...',
            helpText: 'Enter your Google AI API key'
        },
        { 
            id: 'deepseek',
            name: 'DeepSeek',
            placeholder: 'sk-...',
            helpText: 'Enter your DeepSeek API key'
        }
    ];

    const handleKeyChange = (vendorId, value) => {
        try {
            onUpdateApiKey(vendorId, value);
            localStorage.setItem(`apiKey_${vendorId}`, value);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="api-key-manager space-y-4" data-name="api-key-manager">
            {vendors.map(vendor => (
                <div key={vendor.id} className="space-y-2" data-name={`api-key-section-${vendor.id}`}>
                    <label className="block text-sm font-medium">
                        {vendor.name} API Key
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            value={apiKeys[vendor.id] || ''}
                            onChange={(e) => handleKeyChange(vendor.id, e.target.value)}
                            placeholder={vendor.placeholder}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-700 pr-10"
                            data-name={`api-key-input-${vendor.id}`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {apiKeys[vendor.id] && (
                                <i className="fas fa-check text-green-500"></i>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {vendor.helpText}
                    </p>
                </div>
            ))}
        </div>
    );
}

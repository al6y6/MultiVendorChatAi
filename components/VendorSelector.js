function VendorSelector({ selectedVendor, onVendorChange }) {
    const vendors = [
        { 
            id: 'openai',
            name: 'OpenAI',
            models: ['gpt-4', 'gpt-3.5-turbo'],
            icon: 'fa-robot'
        },
        { 
            id: 'anthropic',
            name: 'Anthropic',
            models: ['claude-2', 'claude-instant'],
            icon: 'fa-brain'
        },
        { 
            id: 'google',
            name: 'Google AI',
            models: ['gemini-pro', 'gemini-vision'],
            icon: 'fa-google'
        },
        { 
            id: 'deepseek',
            name: 'DeepSeek',
            models: ['deepseek-chat', 'deepseek-coder'],
            icon: 'fa-microchip'
        }
    ];

    return (
        <div className="vendor-selector p-2" data-name="vendor-selector-container">
            <select
                value={selectedVendor}
                onChange={(e) => onVendorChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                data-name="vendor-select"
            >
                {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                    </option>
                ))}
            </select>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400" data-name="vendor-models">
                {vendors.find(v => v.id === selectedVendor)?.models.join(', ')}
            </div>
        </div>
    );
}

function loadApiKeys() {
    try {
        const vendors = ['openai', 'anthropic', 'google', 'deepseek'];
        const keys = {};
        
        vendors.forEach(vendor => {
            const key = localStorage.getItem(`apiKey_${vendor}`);
            if (key) {
                keys[vendor] = key;
            }
        });
        
        return keys;
    } catch (error) {
        reportError(error);
        return {};
    }
}

function saveApiKey(vendor, key) {
    try {
        localStorage.setItem(`apiKey_${vendor}`, key);
    } catch (error) {
        reportError(error);
    }
}

function clearApiKeys() {
    try {
        const vendors = ['openai', 'anthropic', 'google', 'deepseek'];
        vendors.forEach(vendor => {
            localStorage.removeItem(`apiKey_${vendor}`);
        });
    } catch (error) {
        reportError(error);
    }
}

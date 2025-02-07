async function sendMessageToVendor(message, vendor, apiKey) {
    try {
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        let response;
        const headers = {
            'Content-Type': 'application/json',
        };

        switch (vendor) {
            case 'openai':
                headers['Authorization'] = `Bearer ${apiKey}`;
                response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.'
                            },
                            {
                                role: 'user',
                                content: message
                            }
                        ]
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}. description: ${await response.text()}`);
                }
                const openaiData = await response.json();
                return openaiData.choices[0].message.content;

            case 'anthropic':
                headers['x-api-key'] = apiKey;
                headers['anthropic-version'] = '2023-06-01';
                response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: 'claude-2',
                        max_tokens: 1000,
                        messages: [{
                            role: 'user',
                            content: message
                        }]
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}. description: ${await response.text()}`);
                }
                const anthropicData = await response.json();
                return anthropicData.content[0].text;

            case 'google':
                // Validate Google API key format
                if (!apiKey.startsWith('AIza')) {
                    throw new Error('Invalid Google API key format. Should start with "AIza"');
                }

                // Use the API key as a URL parameter instead of header for Google AI
                const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
                
                response = await fetch(googleApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: message
                            }]
                        }]
                    })
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Google AI API Error:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}. description: ${errorText}`);
                }
                
                const googleData = await response.json();
                if (!googleData.candidates || !googleData.candidates[0]?.content?.parts?.[0]?.text) {
                    throw new Error('Unexpected response format from Google AI');
                }
                return googleData.candidates[0].content.parts[0].text;

            case 'deepseek':
                headers['Authorization'] = `Bearer ${apiKey}`;
                response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.'
                            },
                            {
                                role: 'user',
                                content: message
                            }
                        ]
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}. description: ${await response.text()}`);
                }
                const deepseekData = await response.json();
                return deepseekData.choices[0].message.content;

            default:
                throw new Error(`Unsupported vendor: ${vendor}`);
        }
    } catch (error) {
        reportError(error);
        throw new Error(`Failed to get response from ${vendor}: ${error.message}`);
    }
}

async function handleFileUpload(file) {
    try {
        if (file.type.startsWith('text/')) {
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(new Error('Failed to read file'));
                reader.readAsText(file);
            });
        }
        return 'File uploaded: ' + file.name;
    } catch (error) {
        reportError(error);
        throw new Error('Failed to process file: ' + error.message);
    }
}

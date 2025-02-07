function sanitizeMarkdown(content) {
    try {
        // Remove potentially harmful HTML
        content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        content = content.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
        
        return content;
    } catch (error) {
        reportError(error);
        return content;
    }
}

function formatCodeBlock(content) {
    try {
        return content.replace(/(\w+)?\n([\s\S]*?)/g, (match, language, code) => {
            const lang = language || 'plaintext';
            return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
        });
    } catch (error) {
        reportError(error);
        return content;
    }
}

function processMarkdown(content) {
    try {
        let processed = sanitizeMarkdown(content);
        processed = formatCodeBlock(processed);
        return processed;
    } catch (error) {
        reportError(error);
        return content;
    }
}

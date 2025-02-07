function Header({ onThemeChange, onRefreshChat, onOpenSettings, onOpenPlan }) {
    const themes = [
        { value: 'light', label: 'Light Theme' },
        { value: 'dark', label: 'Dark Theme' },
        { value: 'purple', label: 'Purple Theme' }
    ];

    return (
        <div className="flex items-center justify-end p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700" data-name="header">
            <div className="flex items-center gap-2 sm:gap-4" data-name="header-actions">
                <select 
                    className="px-2 py-1 sm:px-3 sm:py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600"
                    onChange={(e) => onThemeChange(e.target.value)}
                    data-name="theme-selector"
                >
                    {themes.map(theme => (
                        <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                </select>
                <button 
                    onClick={onOpenPlan}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500"
                    data-name="plan-button"
                >
                    <i className="fas fa-crown"></i>
                </button>
                <button 
                    onClick={onRefreshChat}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    data-name="refresh-button"
                >
                    <i className="fas fa-sync-alt"></i>
                </button>
                <button 
                    onClick={onOpenSettings}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    data-name="settings-button"
                >
                    <i className="fas fa-cog"></i>
                </button>
            </div>
        </div>
    );
}

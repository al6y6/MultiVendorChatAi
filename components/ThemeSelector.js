function ThemeSelector({ currentTheme, onThemeChange }) {
    const themes = [
        {
            id: 'light',
            name: 'Light Theme',
            icon: 'fa-sun',
            colors: {
                primary: '#ffffff',
                secondary: '#f7f7f8'
            }
        },
        {
            id: 'dark',
            name: 'Dark Theme',
            icon: 'fa-moon',
            colors: {
                primary: '#1a1b1e',
                secondary: '#2d2d2d'
            }
        },
        {
            id: 'purple',
            name: 'Purple Theme',
            icon: 'fa-palette',
            colors: {
                primary: '#2d1b69',
                secondary: '#1a103f'
            }
        }
    ];

    return (
        <div className="theme-selector p-2" data-name="theme-selector-container">
            <div className="flex flex-col gap-2">
                {themes.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => onThemeChange(theme.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                            currentTheme === theme.id
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        data-name={`theme-button-${theme.id}`}
                    >
                        <i className={`fas ${theme.icon}`}></i>
                        <span>{theme.name}</span>
                        <div
                            className="ml-auto w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: theme.colors.primary }}
                        ></div>
                    </button>
                ))}
            </div>
        </div>
    );
}

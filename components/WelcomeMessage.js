function WelcomeMessage() {
    return (
        <div className="flex items-center justify-center h-full" data-name="welcome-message">
            <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-6xl font-bold text-gray-300 dark:text-gray-600">
                    Selamat Datang
                </h1>
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">
                    Start a conversation to begin
                </p>
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">
                   This App was built by Wasiilah Dev
                </p>
            </div>
        </div>
    );
}

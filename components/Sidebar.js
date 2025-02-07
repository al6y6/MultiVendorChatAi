function Sidebar({ isOpen, onClose, children }) {
    const sidebarRef = React.useRef();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            try {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                    onClose();
                }
            } catch (error) {
                reportError(error);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            ref={sidebarRef}
            data-name="sidebar"
        >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700" data-name="sidebar-header">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        data-name="sidebar-close"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-y-auto h-full" data-name="sidebar-content">
                {children}
            </div>
        </div>
    );
}

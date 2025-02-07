function PlanPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-name="plan-popup">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    data-name="close-plan"
                >
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Upgrade to Premium</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-check text-green-500"></i>
                            <span>Unlimited messages</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-check text-green-500"></i>
                            <span>Access to all AI models</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-check text-green-500"></i>
                            <span>Priority support</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0c10289560000001/f71c6563-fdb1-495f-b291-107c34e6e576.jpeg" 
                            alt="QRIS Payment Code"
                            className="max-w-[200px] rounded-lg shadow-lg"
                            data-name="qris-code"
                        />
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Scan QR code to upgrade your account
                    </p>
                </div>
            </div>
        </div>
    );
}

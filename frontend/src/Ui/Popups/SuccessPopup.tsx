import { useEffect } from "react";

interface SuccessPopupProps {
    message: string;
    onClose: () => void;
}

// Glassmorphism success popup - auto dismisses after 3 seconds
export function SuccessPopup({ message, onClose }: SuccessPopupProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
                {/* Green check circle */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-500/20 border border-green-400/40 rounded-full p-3">
                        <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Success</h3>
                <p className="text-white/80 text-sm font-mono">{message}</p>
            </div>
        </div>
    );
}

// Glassmorphism loading popup - shown while waiting for AI to generate content
export function LoadingPopup() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center">
                {/* Spinning loader */}
                <div className="flex justify-center mb-5">
                    <svg
                        className="w-10 h-10 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Generating...</h3>
                <p className="text-white/70 text-sm font-mono">AI is crafting your product content. This won't take long.</p>
            </div>
        </div>
    );
}

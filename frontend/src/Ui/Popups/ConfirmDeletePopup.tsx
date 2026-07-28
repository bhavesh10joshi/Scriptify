interface ConfirmDeletePopupProps {
    productName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

// Glassmorphism confirm delete modal - warns the user that the action is permanent
export function ConfirmDeletePopup({ productName, onConfirm, onCancel }: ConfirmDeletePopupProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
                {/* Warning icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-full p-3">
                        <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white text-center mb-2">Delete this content?</h3>
                <p className="text-white/70 text-sm font-mono text-center mb-1">
                    You are about to delete <span className="text-white font-bold">"{productName}"</span>.
                </p>
                <p className="text-red-300 text-xs font-mono text-center mb-6">
                    This action cannot be undone and the content will not be recovered.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-md border border-white/30 text-white font-mono text-sm hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2 rounded-md bg-red-500/70 hover:bg-red-500/90 text-white font-mono text-sm font-bold transition-colors"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

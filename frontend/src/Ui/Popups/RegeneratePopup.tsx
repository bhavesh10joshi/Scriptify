import { useRef } from "react";

interface RegeneratePopupProps {
    onCancel: () => void;
    onRegenerate: (suggestion: string) => void;
}

// Glassmorphism popup for collecting the user's regeneration suggestion
export function RegeneratePopup({ onCancel, onRegenerate }: RegeneratePopupProps) {
    const suggestionRef = useRef<HTMLTextAreaElement>(null);

    function handleRegenerate() {
        const suggestion = suggestionRef.current?.value.trim() || "";
        if (!suggestion) {
            alert("Please describe what changes you want before regenerating.");
            return;
        }
        onRegenerate(suggestion);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-1">Regenerate Content</h2>
                <p className="text-white/60 text-sm font-mono mb-5">
                    Describe what you want changed or improved. Be specific for better results.
                </p>

                <textarea
                    ref={suggestionRef}
                    rows={5}
                    placeholder="e.g. Make the description more formal, add more technical details, target a younger audience..."
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50 resize-none mb-5"
                />

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-md border border-white/30 text-white font-mono text-sm hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRegenerate}
                        className="flex-1 py-2 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white font-mono text-sm font-bold transition-colors"
                    >
                        Regenerate
                    </button>
                </div>
            </div>
        </div>
    );
}

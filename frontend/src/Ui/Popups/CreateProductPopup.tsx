import { useRef } from "react";

interface CreateProductPopupProps {
    onBack: () => void;
    onGenerate: (data: {
        name: string;
        category: string;
        brandName: string;
        keyFeatures: string;
        targetAudience: string;
    }) => void;
}

// Glassmorphism popup for collecting product details before AI generation
export function CreateProductPopup({ onBack, onGenerate }: CreateProductPopupProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const brandNameRef = useRef<HTMLInputElement>(null);
    const keyFeaturesRef = useRef<HTMLTextAreaElement>(null);
    const targetAudienceRef = useRef<HTMLInputElement>(null);

    function handleGenerate() {
        const name = nameRef.current?.value.trim() || "";
        const category = categoryRef.current?.value.trim() || "";
        const brandName = brandNameRef.current?.value.trim() || "";
        const keyFeatures = keyFeaturesRef.current?.value.trim() || "";
        const targetAudience = targetAudienceRef.current?.value.trim() || "";

        // basic check - all fields are needed by the backend
        if (!name || !category || !brandName || !keyFeatures || !targetAudience) {
            alert("Please fill in all fields before generating.");
            return;
        }

        onGenerate({ name, category, brandName, keyFeatures, targetAudience });
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <h2 className="text-xl font-bold text-white mb-1">Create New Product Content</h2>
                <p className="text-white/60 text-sm font-mono mb-6">Fill in the details below and let AI do the writing.</p>

                {/* Product Name */}
                <div className="mb-4">
                    <label className="text-white/80 text-sm font-mono mb-1 block">Product Name</label>
                    <input
                        type="text"
                        placeholder="e.g. AirMax Pro 2025"
                        ref={nameRef}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50"
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="text-white/80 text-sm font-mono mb-1 block">Category</label>
                    <input
                        type="text"
                        placeholder="e.g. Footwear, Electronics, Skincare"
                        ref={categoryRef}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50"
                    />
                </div>

                {/* Brand Name */}
                <div className="mb-4">
                    <label className="text-white/80 text-sm font-mono mb-1 block">Brand Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Nike, Apple, Dove"
                        ref={brandNameRef}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50"
                    />
                </div>

                {/* Key Features */}
                <div className="mb-4">
                    <label className="text-white/80 text-sm font-mono mb-1 block">Key Features</label>
                    <textarea
                        placeholder="e.g. Lightweight, waterproof, carbon-fiber sole, breathable mesh"
                        ref={keyFeaturesRef}
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50 resize-none"
                    />
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                    <label className="text-white/80 text-sm font-mono mb-1 block">Target Audience</label>
                    <input
                        type="text"
                        placeholder="e.g. Athletes, college students, working professionals"
                        ref={targetAudienceRef}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/40 font-mono text-sm focus:outline-none focus:border-white/50"
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="flex-1 py-2 rounded-md border border-white/30 text-white font-mono text-sm hover:bg-white/10 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleGenerate}
                        className="flex-1 py-2 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white font-mono text-sm font-bold transition-colors"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}

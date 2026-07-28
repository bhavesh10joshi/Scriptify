import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../BackendUrl/BackendUrl";
import type { ProductData } from "../Types/types";
import { RegeneratePopup } from "../Ui/Popups/RegeneratePopup";
import { LoadingPopup } from "../Ui/Popups/LoadingPopup";
import { ErrorPopup } from "../Ui/Popups/ErrorPopup";
import { SuccessPopup } from "../Ui/Popups/SuccessPopup";

// ViewContent page - shows all AI-generated fields for a specific product
export function ViewContent() {
    const navigate = useNavigate();
    const location = useLocation();

    // the product comes via router state from Dashboard
    const [product, setProduct] = useState<ProductData | null>(
        (location.state as any)?.product || null
    );

    const [showRegeneratePopup, setShowRegeneratePopup] = useState(false);
    const [showLoadingPopup, setShowLoadingPopup] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // copy button feedback state
    const [copied, setCopied] = useState(false);

    const isDark = localStorage.getItem("theme") === "dark";

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    // if no product in state, send user back to dashboard
    useEffect(() => {
        if (!product) {
            navigate("/Scriptify/User/Dashboard");
        }
    }, [product, navigate]);

    function getToken() {
        return localStorage.getItem("token") || "";
    }

    function showErr(msg: string) {
        setErrorMsg(msg);
        setShowError(true);
    }

    // copies all the AI content as one formatted block
    function handleCopyAll() {
        if (!product) return;

        const text = [
            `PRODUCT: ${product.name}`,
            `BRAND: ${product.brandName}`,
            `CATEGORY: ${product.category}`,
            "",
            `TAGLINE:`,
            product.productTagline || "",
            "",
            `SHORT DESCRIPTION:`,
            product.shortDescription || "",
            "",
            `FULL DESCRIPTION:`,
            product.productDescription || "",
            "",
            `KEY SELLING POINTS:`,
            product.keySellingPoints || "",
            "",
            `SEO KEYWORDS:`,
            product.seoKeywords || ""
        ].join("\n");

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }

    // handles regeneration - calls /Modulate endpoint with the user's suggestion
    async function handleRegenerate(suggestion: string) {
        if (!product) return;

        setShowRegeneratePopup(false);
        setShowLoadingPopup(true);

        try {
            const result = await axios.post(
                `${BACKEND_URL}/Scriptify/Api/Product/Content/Modulate`,
                { productId: product._id, suggestion },
                { headers: { authorization: getToken() } }
            );

            setShowLoadingPopup(false);

            // update the product on screen with the new content
            const updated: ProductData = result.data.Data;
            setProduct(updated);

            setSuccessMsg("Changes made. Your content has been updated.");
            setShowSuccess(true);
        } catch (e) {
            setShowLoadingPopup(false);
            showErr("Regeneration failed. Please try again.");
        }
    }

    if (!product) return null;

    return (
        <>
            {showLoadingPopup && <LoadingPopup />}
            {showError && <ErrorPopup message={errorMsg} onClose={() => setShowError(false)} />}
            {showSuccess && <SuccessPopup message={successMsg} onClose={() => setShowSuccess(false)} />}
            {showRegeneratePopup && (
                <RegeneratePopup
                    onCancel={() => setShowRegeneratePopup(false)}
                    onRegenerate={handleRegenerate}
                />
            )}

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

                {/* Top header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Scriptify</span>

                    <div className="flex items-center gap-3">
                        {/* Back to dashboard */}
                        <button
                            onClick={() => navigate("/Scriptify/User/Dashboard")}
                            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-mono rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Back
                        </button>

                        {/* Regenerate */}
                        <button
                            onClick={() => setShowRegeneratePopup(true)}
                            className="px-4 py-2 text-sm border border-indigo-400 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-mono rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                            Regenerate
                        </button>

                        {/* Copy All */}
                        <button
                            onClick={handleCopyAll}
                            className={`px-4 py-2 text-sm font-mono rounded-md transition-colors ${
                                copied
                                    ? "bg-green-600 text-white"
                                    : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
                            }`}
                        >
                            {copied ? "Copied!" : "Copy All"}
                        </button>
                    </div>
                </header>

                {/* Content area */}
                <main className="max-w-3xl mx-auto px-6 py-8">

                    {/* Product meta header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{product.name}</h1>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-700">
                                {product.brandName}
                            </span>
                            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                                {product.category}
                            </span>
                            {product.createdDate && (
                                <span className="text-xs font-mono text-gray-400 dark:text-gray-500 px-2 py-1">
                                    {new Date(product.createdDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Tagline */}
                    <ContentSection label="Tagline">
                        <p className="text-gray-800 dark:text-gray-200 font-bold text-lg italic">
                            "{product.productTagline || "Not available"}"
                        </p>
                    </ContentSection>

                    {/* Short Description */}
                    <ContentSection label="Short Description">
                        <p className="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed">
                            {product.shortDescription || "Not available"}
                        </p>
                    </ContentSection>

                    {/* Full Product Description */}
                    <ContentSection label="Full Product Description">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                            {product.productDescription || "Not available"}
                        </p>
                    </ContentSection>

                    {/* Key Selling Points */}
                    <ContentSection label="Key Selling Points">
                        <div className="text-gray-700 dark:text-gray-300 text-sm font-mono leading-relaxed whitespace-pre-line">
                            {product.keySellingPoints || "Not available"}
                        </div>
                    </ContentSection>

                    {/* SEO Keywords */}
                    <ContentSection label="SEO Keywords">
                        <div className="flex flex-wrap gap-2">
                            {product.seoKeywords
                                ? product.seoKeywords.split(",").map((kw, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                                    >
                                        {kw.trim()}
                                    </span>
                                ))
                                : <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">Not available</span>
                            }
                        </div>
                    </ContentSection>

                    {/* Bottom actions */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
                        <button
                            onClick={() => navigate("/Scriptify/User/Dashboard")}
                            className="px-5 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-mono rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                        <button
                            onClick={() => setShowRegeneratePopup(true)}
                            className="px-5 py-2 text-sm border border-indigo-400 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-mono rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                            Regenerate
                        </button>
                        <button
                            onClick={handleCopyAll}
                            className={`px-5 py-2 text-sm font-mono rounded-md transition-colors ${
                                copied
                                    ? "bg-green-600 text-white"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        >
                            {copied ? "Copied!" : "Copy All Content"}
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}

// small helper component to keep the content sections DRY
function ContentSection({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-6 p-5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                {label}
            </h2>
            {children}
        </div>
    );
}

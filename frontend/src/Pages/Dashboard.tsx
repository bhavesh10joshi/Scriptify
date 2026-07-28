import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../BackendUrl/BackendUrl";
import type { ProductData } from "../Types/types";
import { CreateProductPopup } from "../Ui/Popups/CreateProductPopup";
import { ConfirmDeletePopup } from "../Ui/Popups/ConfirmDeletePopup";
import { LoadingPopup } from "../Ui/Popups/LoadingPopup";
import { ErrorPopup } from "../Ui/Popups/ErrorPopup";
import { SuccessPopup } from "../Ui/Popups/SuccessPopup";

// Dashboard page - shows history, lets user create new content, delete existing, and logout
export function Dashboard() {
    const [history, setHistory] = useState<ProductData[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    // popup states
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showLoadingPopup, setShowLoadingPopup] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<ProductData | null>(null);

    // dark mode state
    const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

    const navigate = useNavigate();

    // apply theme on mount/change
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    // fetch history when the page loads
    useEffect(() => {
        loadHistory();
    }, []);

    function getToken() {
        return localStorage.getItem("token") || "";
    }

    async function loadHistory() {
        setHistoryLoading(true);
        try {
            const result = await axios.post(
                `${BACKEND_URL}/Scriptify/Api/Product/History`,
                {},
                { headers: { authorization: getToken() } }
            );
            // the backend wraps the data in result.data.Data
            setHistory(result.data.Data || []);
        } catch (e) {
            showErr("Could not load your history. Please try again.");
        } finally {
            setHistoryLoading(false);
        }
    }

    function showErr(msg: string) {
        setErrorMsg(msg);
        setShowError(true);
    }

    function showSucc(msg: string) {
        setSuccessMsg(msg);
        setShowSuccess(true);
    }

    // called when user clicks generate inside CreateProductPopup
    async function handleGenerate(formData: {
        name: string;
        category: string;
        brandName: string;
        keyFeatures: string;
        targetAudience: string;
    }) {
        setShowCreatePopup(false);
        setShowLoadingPopup(true);

        try {
            const result = await axios.post(
                `${BACKEND_URL}/Scriptify/Api/Product/Content/Generate/New`,
                formData,
                { headers: { authorization: getToken() } }
            );
            setShowLoadingPopup(false);

            // navigate to view the freshly generated content
            const newProduct: ProductData = result.data.Data;
            navigate("/Scriptify/User/View/Content", { state: { product: newProduct } });
        } catch (e) {
            setShowLoadingPopup(false);
            showErr("Failed to generate content. Make sure the backend is running.");
        }
    }

    // called when user confirms delete
    async function handleDelete() {
        if (!deleteTarget) return;
        const productId = deleteTarget._id;
        setDeleteTarget(null);

        try {
            await axios.post(
                `${BACKEND_URL}/Scriptify/Api/Product/Content/Delete`,
                { productId },
                { headers: { authorization: getToken() } }
            );
            // remove it from local state without re-fetching
            setHistory(prev => prev.filter(p => p._id !== productId));
            showSucc("Content deleted successfully.");
        } catch (e) {
            showErr("Failed to delete the content.");
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/LandingPage");
    }

    function handleViewContent(product: ProductData) {
        navigate("/Scriptify/User/View/Content", { state: { product } });
    }

    // format date string for display
    function formatDate(dateStr?: string) {
        if (!dateStr) return "—";
        try {
            return new Date(dateStr).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
        } catch {
            return dateStr;
        }
    }

    return (
        <>
            {showLoadingPopup && <LoadingPopup />}
            {showError && <ErrorPopup message={errorMsg} onClose={() => setShowError(false)} />}
            {showSuccess && <SuccessPopup message={successMsg} onClose={() => setShowSuccess(false)} />}
            {showCreatePopup && (
                <CreateProductPopup
                    onBack={() => setShowCreatePopup(false)}
                    onGenerate={handleGenerate}
                />
            )}
            {deleteTarget && (
                <ConfirmDeletePopup
                    productName={deleteTarget.name}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

                {/* Top header bar */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Scriptify</span>

                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <button
                            onClick={() => setIsDark(prev => !prev)}
                            aria-label="Toggle dark mode"
                            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isDark ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* Create new button */}
                        <button
                            onClick={() => setShowCreatePopup(true)}
                            className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-mono rounded-md transition-colors"
                        >
                            + New Content
                        </button>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-mono rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main content area */}
                <main className="max-w-5xl mx-auto px-6 py-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Your Content History</h1>
                    <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">
                        All your previously generated product content. Click a card to view it.
                    </p>

                    {/* Loading state */}
                    {historyLoading && (
                        <div className="flex items-center justify-center py-20">
                            <svg className="w-8 h-8 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    )}

                    {/* Empty state */}
                    {!historyLoading && history.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-gray-400 dark:text-gray-600 text-5xl mb-4">📄</div>
                            <h3 className="text-gray-700 dark:text-gray-300 font-bold mb-2">No content generated yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mb-5">
                                Create your first AI-generated product listing.
                            </p>
                            <button
                                onClick={() => setShowCreatePopup(true)}
                                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-mono rounded-md transition-colors"
                            >
                                + Create New Content
                            </button>
                        </div>
                    )}

                    {/* History cards */}
                    {!historyLoading && history.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {history.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                                >
                                    {/* Product name + tagline */}
                                    <div className="mb-3">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{product.name}</h3>
                                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                            {product.productTagline || "No tagline"}
                                        </p>
                                    </div>

                                    {/* Meta info */}
                                    <div className="flex flex-col gap-1 mb-4">
                                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                                                {product.category}
                                            </span>
                                            <span className="text-gray-400 dark:text-gray-500">|</span>
                                            <span>{product.brandName}</span>
                                        </div>
                                        <div className="text-xs font-mono text-gray-400 dark:text-gray-500">
                                            {formatDate(product.createdDate)}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewContent(product)}
                                            className="flex-1 py-1.5 text-xs font-mono border border-indigo-400 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(product)}
                                            className="flex-1 py-1.5 text-xs font-mono border border-red-300 dark:border-red-700 text-red-500 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

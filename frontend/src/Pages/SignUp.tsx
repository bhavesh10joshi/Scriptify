import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../BackendUrl/BackendUrl";
import { SignUpValidation } from "../Validations/ZodValidations";
import { SuccessPopup } from "../Ui/Popups/SuccessPopup";
import { ErrorPopup } from "../Ui/Popups/ErrorPopup";

// Sign up page - collects name, email, password
export function SignUp() {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Something went wrong.");

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // If a success popup appears, redirect to login after it auto-dismisses (3s)
    useEffect(() => {
        if (showSuccess) {
            const t = setTimeout(() => {
                navigate("/Scriptify/User/Login");
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [showSuccess, navigate]);

    function showErr(msg: string) {
        setErrorMsg(msg);
        setShowError(true);
    }

    async function handleSignUp() {
        const name = nameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const Password = passwordRef.current?.value || "";

        // validate inputs with zod before hitting the backend
        const check = SignUpValidation.safeParse({ name, email, Password });
        if (!check.success) {
            const msg = check.error.issues[0]?.message || "Validation failed.";
            showErr(msg);
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/Scriptify/Api/User/SignUp`, {
                name,
                email,
                Password
            });
            setShowSuccess(true);
        } catch (e: any) {
            const msg = e?.response?.data?.msg || "Registration failed. Please try again.";
            showErr(msg);
        } finally {
            setLoading(false);
        }
    }

    // Apply saved theme on this page too
    const isDark = localStorage.getItem("theme") === "dark";
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <>
            {showSuccess && (
                <SuccessPopup
                    message="Account created successfully! Redirecting to login..."
                    onClose={() => setShowSuccess(false)}
                />
            )}
            {showError && (
                <ErrorPopup
                    message={errorMsg}
                    onClose={() => setShowError(false)}
                />
            )}

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 transition-colors duration-200">

                {/* Card header */}
                <div className="bg-white dark:bg-gray-900 w-full max-w-[24rem] rounded-t-lg shadow-lg border-b border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center py-5">
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Scriptify</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">AI Product Content Generator</div>
                </div>

                {/* Card body */}
                <div className="bg-white dark:bg-gray-900 w-full max-w-[24rem] rounded-b-lg shadow-lg p-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Create Account</h2>

                    <label className="text-sm font-mono text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Smith"
                        ref={nameRef}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 mt-1 mb-4 text-sm font-mono focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 placeholder-gray-400"
                    />

                    <label className="text-sm font-mono text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        ref={emailRef}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 mt-1 mb-4 text-sm font-mono focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 placeholder-gray-400"
                    />

                    <label className="text-sm font-mono text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        placeholder="Min. 2 characters"
                        ref={passwordRef}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 mt-1 mb-6 text-sm font-mono focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 placeholder-gray-400"
                    />

                    <button
                        disabled={loading}
                        onClick={handleSignUp}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-md transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : "Create Account"}
                    </button>

                    <div className="text-center mt-5 text-sm font-mono text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/Scriptify/User/Login")}
                            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

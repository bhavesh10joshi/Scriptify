import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../BackendUrl/BackendUrl";
import { LoginValidation } from "../Validations/ZodValidations";
import { SuccessPopup } from "../Ui/Popups/SuccessPopup";
import { ErrorPopup } from "../Ui/Popups/ErrorPopup";

// Login page - collects email and password
export function LogIn() {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Something went wrong.");

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // After the success popup shows, wait for it to close then go to dashboard
    useEffect(() => {
        if (showSuccess) {
            const t = setTimeout(() => {
                navigate("/Scriptify/User/Dashboard");
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [showSuccess, navigate]);

    function showErr(msg: string) {
        setErrorMsg(msg);
        setShowError(true);
    }

    async function handleLogin() {
        const email = emailRef.current?.value || "";
        const Password = passwordRef.current?.value || "";

        // run zod validation before sending to backend
        const check = LoginValidation.safeParse({ email, Password });
        if (!check.success) {
            const msg = check.error.issues[0]?.message || "Validation failed.";
            showErr(msg);
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${BACKEND_URL}/Scriptify/Api/User/Login`, {
                email,
                password: Password  // backend expects lowercase 'password' for login
            });

            if (result.data.token) {
                localStorage.setItem("token", result.data.token);
                setShowSuccess(true);
            } else {
                showErr("Login failed. No token received.");
            }
        } catch (e: any) {
            const msg = e?.response?.data?.msg || "Login failed. Check your credentials.";
            showErr(msg);
        } finally {
            setLoading(false);
        }
    }

    // apply saved theme
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
                    message="Logged in successfully! Redirecting to your dashboard..."
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
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sign In</h2>

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
                        placeholder="••••••••"
                        ref={passwordRef}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 mt-1 mb-6 text-sm font-mono focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 placeholder-gray-400"
                    />

                    <button
                        disabled={loading}
                        onClick={handleLogin}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-md transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : "Sign In"}
                    </button>

                    <div className="text-center mt-5 text-sm font-mono text-gray-500 dark:text-gray-400">
                        New to Scriptify?{" "}
                        <button
                            onClick={() => navigate("/Scriptify/User/SignUp")}
                            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

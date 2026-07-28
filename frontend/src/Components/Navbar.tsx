import { useNavigate } from "react-router-dom";

interface NavbarProps {
    isDark: boolean;
    onToggleDark: () => void;
}

// Simple top navbar used on the landing page
export function Navbar({ isDark, onToggleDark }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            {/* Brand name */}
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
                Scriptify
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
                {/* Dark mode toggle */}
                <button
                    onClick={onToggleDark}
                    aria-label="Toggle dark mode"
                    className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {isDark ? (
                        // Sun icon for switching to light
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        // Moon icon for switching to dark
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={() => navigate("/Scriptify/User/Login")}
                    className="px-4 py-1.5 text-sm font-mono text-indigo-600 dark:text-indigo-400 border border-indigo-400 dark:border-indigo-500 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/Scriptify/User/SignUp")}
                    className="px-4 py-1.5 text-sm font-mono text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors"
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

// Landing page - introduces Scriptify and its core features
export function LandingPage() {
    const navigate = useNavigate();

    // Read the saved theme preference from localStorage on mount
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Apply or remove the dark class on the html element whenever theme changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    function toggleDark() {
        setIsDark(prev => !prev);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Navbar isDark={isDark} onToggleDark={toggleDark} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-xs font-mono px-3 py-1 rounded-full mb-6 border border-indigo-200 dark:border-indigo-700">
                        AI-Powered eCommerce Copywriting
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                        Product Content,{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">Written by AI.</span>
                        <br />
                        Ready in Seconds.
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-lg font-mono mb-8 leading-relaxed">
                        Scriptify generates product descriptions, SEO keywords, taglines and more
                        for your eCommerce store — all with one click.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate("/Scriptify/User/SignUp")}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-md transition-colors"
                        >
                            Start for Free
                        </button>
                        <button
                            onClick={() => navigate("/Scriptify/User/Login")}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-mono rounded-md transition-colors"
                        >
                            I already have an account
                        </button>
                    </div>
                </div>
            </section>

            {/* What it generates section */}
            <section className="py-16 px-6 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">What Scriptify Generates</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 font-mono text-sm mb-10">
                        Give us the basics. We'll write everything else.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                title: "Product Description",
                                desc: "A detailed 150-200 word description written for conversions.",
                                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            },
                            {
                                title: "Short Description",
                                desc: "A quick 2-3 line summary perfect for product cards.",
                                icon: "M4 6h16M4 12h8m-8 6h16"
                            },
                            {
                                title: "Key Selling Points",
                                desc: "5 bullet-point reasons why customers should buy.",
                                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            },
                            {
                                title: "SEO Keywords",
                                desc: "5-8 relevant keywords to help your product rank on Google.",
                                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            },
                            {
                                title: "Product Tagline",
                                desc: "A punchy, memorable one-liner for your brand.",
                                icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            },
                            {
                                title: "Regenerate Anytime",
                                desc: "Not happy? Give feedback and let AI refine it.",
                                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            }
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-md">
                                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">How It Works</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 font-mono text-sm mb-10">
                        Three steps to great product copy.
                    </p>

                    <div className="space-y-5">
                        {[
                            { step: "1", title: "Create an account", desc: "Sign up for free with your name, email and password." },
                            { step: "2", title: "Fill in your product details", desc: "Name, category, brand, features and target audience — that's all we need." },
                            { step: "3", title: "Get AI-generated content", desc: "Instantly get a full description, tagline, SEO keywords and more. Copy or refine as needed." }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA footer section */}
            <section className="py-14 px-6 bg-indigo-600 dark:bg-indigo-800 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Ready to write better product content?</h2>
                <p className="text-indigo-200 font-mono text-sm mb-6">Sign up for free, no credit card required.</p>
                <button
                    onClick={() => navigate("/Scriptify/User/SignUp")}
                    className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-md hover:bg-indigo-50 transition-colors"
                >
                    Get Started Now
                </button>
            </section>
        </div>
    );
}

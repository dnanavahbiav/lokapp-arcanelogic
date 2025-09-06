"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Header() {
    const [profileName,setProfileName] = useState("John Doe");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <nav className="w-full py-4 px-8 bg-white shadow flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800 tracking-wide">
                LOK App
            </span>
            <div className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center gap-2 text-gray-700 font-medium text-lg px-4 py-2 rounded hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen((open) => !open)}
                >
                    <span>{profileName}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <button
                            className="w-full text-left px-4 py-3 hover:bg-amber-100 text-gray-800 transition"
                            onClick={() => {
                                setDropdownOpen(false);
                                // handle view profile
                            }}
                        >
                            View Profile
                        </button>
                        <button
                            className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 transition border-t border-gray-100"
                            onClick={() => {
                                setDropdownOpen(false);
                                // handle logout
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
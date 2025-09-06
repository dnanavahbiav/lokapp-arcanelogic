"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Home() {
  const router = useRouter();
  const handleNewReport = () => {

    router.push("/newreport");
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Header />
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <button className="w-64 py-6 text-xl rounded-lg bg-amber-400 hover:bg-amber-500 text-white font-semibold shadow transition" onClick={handleNewReport}>
          New Report
        </button>
        <button className="w-64 py-6 text-xl rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-semibold shadow transition">
          All Reports
        </button>
      </main>
    </div>
  );
}

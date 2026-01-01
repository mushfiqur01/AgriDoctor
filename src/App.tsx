// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { InstallPrompt } from "@/components/InstallPrompt";

import Navbar from "@/components/Navbar";

import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

/* =====================
   QUERY CLIENT
===================== */
const queryClient = new QueryClient();

/* =====================
   APP
===================== */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          {/* Toast Notifications */}
          <Toaster />
          <Sonner position="top-center" />

          <BrowserRouter>
            {/* Global Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>

          {/* PWA Install Prompt */}
          <InstallPrompt />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;

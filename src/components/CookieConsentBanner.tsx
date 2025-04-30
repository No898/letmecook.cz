"use client"; // Komponenta potřebuje state a efekty, musí být klientská

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Deklarace gtag funkce pro TypeScript (opraveno)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Funkce pro aktualizaci souhlasu v Google Consent Mode
const updateConsent = (accepted: boolean) => {
  if (typeof window.gtag === "function") {
    const consentState = {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: accepted ? "granted" : "denied",
      ad_user_data: accepted ? "granted" : "denied",
      ad_personalization: accepted ? "granted" : "denied",
    };
    window.gtag("consent", "update", consentState);
    console.log("Cookie Consent: Consent updated:", consentState);
  } else {
    console.warn(
      "Cookie Consent: gtag function not found when trying to update consent."
    );
  }
};

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem("cookie_consent_status");

    // Pokud uživatel dříve souhlasil nebo odmítl, aktualizujeme Consent Mode hned
    if (consentStatus === "accepted") {
      updateConsent(true);
      // Banner se nezobrazí
    } else if (consentStatus === "declined") {
      updateConsent(false);
      // Banner se nezobrazí
    } else {
      // Pokud souhlas ještě nebyl udělen ani odmítnut, zobrazíme banner
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent_status", "accepted");
    setShowBanner(false);
    updateConsent(true); // Aktualizace souhlasu na 'granted'
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent_status", "declined");
    setShowBanner(false);
    updateConsent(false); // Aktualizace souhlasu na 'denied'
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.2,
          }}
          className="fixed bottom-4 left-4 right-4 z-[999] p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 font-sans sm:left-auto sm:right-5 sm:bottom-5 sm:w-full sm:max-w-md"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 font-serif">
            Trocha soukromí, prosím
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Používáme cookies a podobné technologie, abychom pochopili, jak se
            vám tu líbí (analýza), a mohli web zlepšovat. Váš souhlas nám pomůže
            uvařit lepší zážitek.
          </p>
          <div className="flex items-center justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDecline}
              className="px-3 py-1.5 rounded text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition-colors duration-150"
            >
              Jen nezbytné
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAccept}
              className="px-3 py-1.5 rounded text-xs font-medium text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 dark:focus:ring-gray-100 dark:focus:ring-offset-gray-900 transition-colors duration-150"
            >
              Přijímám vše
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

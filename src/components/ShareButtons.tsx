"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import ikon
import FacebookIcon from "./icons/FacebookIcon";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import XIcon from "./icons/XIcon";
import EmailIcon from "./icons/EmailIcon";
import LinkIcon from "./icons/LinkIcon";

interface ShareButtonsProps {
    recipeTitle: string;
    translations: {
        share_label: string;
        share_on_facebook: string;
        share_on_whatsapp: string;
        share_on_x: string;
        share_via_email: string;
        check_out_recipe?: string; // Nepovinný, s fallbackem
        copy_link: string;
        copied_tooltip?: string; // Nepovinný, s fallbackem
    };
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ recipeTitle, translations }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        // Zajistíme, že window je definováno (pro SSR/prerendering)
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleCopyLink = () => {
        if (!currentUrl || typeof navigator === 'undefined') return; // Kontrola existence navigator
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2500);
            })
            .catch((err) => {
                console.error("Nepodařilo se zkopírovat odkaz: ", err);
            });
    };

    // Získáme URL bezpečně až na klientovi
    const safeCurrentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-sm text-gray-400">
                {translations.share_label}
            </span>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    safeCurrentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title={translations.share_on_facebook}
                className="text-gray-400 hover:text-accent transition-colors duration-150"
                aria-label={translations.share_on_facebook} 
            >
                <FacebookIcon className="h-5 w-5" />
            </a>
            <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    recipeTitle + " " + safeCurrentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title={translations.share_on_whatsapp}
                className="text-gray-400 hover:text-accent transition-colors duration-150"
                aria-label={translations.share_on_whatsapp}
            >
                <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    safeCurrentUrl
                )}&text=${encodeURIComponent(recipeTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                title={translations.share_on_x}
                className="text-gray-400 hover:text-accent transition-colors duration-150"
                aria-label={translations.share_on_x}
            >
                <XIcon className="h-5 w-5" />
            </a>
            <a
                href={`mailto:?subject=${encodeURIComponent(
                    recipeTitle
                )}&body=${encodeURIComponent(
                    (translations.check_out_recipe || "Check out this recipe: ") + safeCurrentUrl
                )}`}
                title={translations.share_via_email}
                className="text-gray-400 hover:text-accent transition-colors duration-150"
                aria-label={translations.share_via_email}
            >
                <EmailIcon className="w-5 h-5" />
            </a>
            <div className="relative">
                <button
                    onClick={handleCopyLink}
                    title={translations.copy_link}
                    className="text-gray-400 hover:text-accent transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!safeCurrentUrl || isCopied}
                    aria-label={translations.copy_link}
                >
                    <LinkIcon className="w-5 h-5" />
                </button>
                <AnimatePresence>
                    {isCopied && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white shadow-md z-10"
                            role="status"
                        >
                            {translations.copied_tooltip || "Link copied!"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ShareButtons; 
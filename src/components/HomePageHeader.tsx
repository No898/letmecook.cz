'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

interface HomePageHeaderProps {
    title: string; // Přeložený nadpis
    instagramUrl: string;
    emailAddress: string;
}

export default function HomePageHeader({ title, instagramUrl, emailAddress }: HomePageHeaderProps) {
    return (
        <>
            {/* Nadpis s animací */}
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 font-serif text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {title}
            </motion.h1>

            {/* Sekce s kontakty s animací - statické aria-label */}
            <motion.div
                className="flex items-center space-x-4 mb-12 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram" // Statické aria-label
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                    <FaInstagram size={24} />
                </a>
                <span className="text-sm">|</span>
                <a
                    href={`mailto:${emailAddress}`}
                    aria-label="Email" // Statické aria-label
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 flex items-center space-x-1"
                >
                    <FaEnvelope size={24} />
                    <span className="text-sm">{emailAddress}</span>
                </a>
            </motion.div>
        </>
    );
} 
import React from 'react';

// Tento layout dědí html a body tagy z kořenového layoutu src/app/layout.tsx
// Může obsahovat specifické prvky pro všechny lokalizované stránky
export default function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>; // Jen předává children
} 
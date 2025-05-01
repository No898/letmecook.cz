'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { gsap } from 'gsap';
import Image from 'next/image'; // Import Next Image

interface HomePageHeaderProps {
    title: string; // Přeložený nadpis
    instagramUrl: string;
    emailAddress: string;
    locale: string; // Aktuální locale
    languages: string[]; // Všechny podporované jazyky
}

export default function HomePageHeader({ title, instagramUrl, emailAddress, locale, languages }: HomePageHeaderProps) {
    const router = useRouter(); // Hook pro navigaci
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]); // Ref pro obalovací divy obrázků
    const tl = useRef<gsap.core.Timeline | null>(null);

    // Mapování jazyků na obrázky
    const langImages: { [key: string]: string } = {
        'cs': '/images/knedlo-vepro-zelo.webp',
        'en': '/images/fish-and-chips.webp',
        'vi': '/images/banh-mi.webp',
        'zh-TW': '/images/beef-noodle-soup.webp'
    };

    useEffect(() => {
        const headerElement = headerRef.current;
        if (!headerElement) return;

        // Získání rozměrů kontejneru pro výpočet středu a poloměru
        const headerWidth = headerElement.offsetWidth;
        const radiusX = headerWidth * 0.7; // Poloměr X zůstává závislý na šířce
        const radiusY = 250; // Další zvětšení vertikálního poloměru
        const centerX = 0;
        const centerY = 0; // Výraznější posun středu dolů

        // Inicializace timeline
        tl.current = gsap.timeline({ paused: true, reversed: true });

        // Animace pro ikony jídel - nyní pro všechny 4
        const angleStep = (Math.PI * 2) / languages.length; // Dělíme počtem všech jazyků (4)

        // Původní smyčka forEach odstraněna - logika přesunuta do delayedCall
        /*
        itemsRef.current = []; // Vyčistíme ref pole před naplněním
        languages.forEach((lang, index) => {
            // ... (kód pro výpočet pozic zde byl, ale už se nepoužívá)
        });
        */

        // ---- RESTRUKTURACE ----
        // GSAP animace spustíme až zde, když jsou elementy vyrenderovány
        gsap.delayedCall(0, () => { // Malé zpoždění pro jistotu
            const renderedItems = headerElement.querySelectorAll<HTMLDivElement>(".language-icon-container");
            renderedItems.forEach((itemContainer, index) => {
                if (!itemContainer) return; // Jistota
                const initialAngle = index * angleStep;
                const randomRadiusMultiplier = 0.85 + Math.random() * 0.3;

                const initialX = centerX + Math.cos(initialAngle) * radiusX * randomRadiusMultiplier;
                const initialY = centerY + Math.sin(initialAngle) * radiusY * randomRadiusMultiplier;

                gsap.set(itemContainer, {
                    opacity: 0,
                    scale: 0,
                    x: initialX,
                    y: initialY
                });

                tl.current?.to(itemContainer, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                }, 0);

                const rotationSpeed = (1 + Math.random() * 0.5) * (Math.random() < 0.5 ? 1 : -1);
                gsap.to({ angle: initialAngle }, {
                    angle: initialAngle + (Math.PI * 2 * rotationSpeed),
                    duration: 12 + Math.random() * 6,
                    repeat: -1,
                    ease: 'none',
                    overwrite: true,
                    onUpdate: function () {
                        const currentAngle = this.targets()[0].angle;
                        const currentX = centerX + Math.cos(currentAngle) * radiusX * randomRadiusMultiplier;
                        const currentY = centerY + Math.sin(currentAngle) * radiusY * randomRadiusMultiplier;
                        gsap.set(itemContainer, { x: currentX, y: currentY });
                    }
                });
            });
            // Uložíme reference pro cleanup
            itemsRef.current = Array.from(renderedItems);
        });
        // ---- KONEC RESTRUKTURACE ----

        const playAnim = () => tl.current?.play();
        const reverseAnim = () => tl.current?.reverse();

        headerElement.addEventListener('mouseenter', playAnim);
        headerElement.addEventListener('mouseleave', reverseAnim);

        return () => {
            headerElement.removeEventListener('mouseenter', playAnim);
            headerElement.removeEventListener('mouseleave', reverseAnim);
            tl.current?.kill();
            // Cleanup pro dynamicky přidané tweens
            itemsRef.current.forEach(item => item && gsap.killTweensOf(item));
        };

        // Změna závislosti - chceme resetovat pozice při změně locale
    }, [locale, languages.length]);

    const handleItemClick = (targetLocale: string) => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${locale}`, `/${targetLocale}`);
        router.push(newPath);
    };


    return (
        <div ref={headerRef} className="relative flex flex-col items-center mb-12"> {/* Kontejner pro hover */}
            {/* Nadpis s animací (framer-motion) */}
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 font-serif text-center cursor-default" // Přidán cursor
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {title}
            </motion.h1>

            {/* Ikony jídel - absolutně pozicované - nyní iterujeme přes VŠECHNY jazyky */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                {languages.map((lang) => { // Odstraněn nepoužívaný 'index'
                    const imgSrc = langImages[lang];
                    if (!imgSrc) return null;

                    return (
                        <div // Obalovací div pro GSAP transformace
                            key={lang}
                            // Odstraněno přiřazení ref zde, řešíme přes querySelectorAll
                            // ref={el => { itemsRef.current[index] = el; }}
                            className="language-icon-container absolute cursor-pointer group" // Přidána třída pro selekci
                            style={{ width: '120px', height: '120px' }}
                            onClick={() => handleItemClick(lang)}
                            title={`Přepnout na ${lang.toUpperCase()}`}
                        >
                            <Image
                                src={imgSrc}
                                alt={`Jídlo reprezentující ${lang.toUpperCase()}`}
                                width={120}
                                height={120}
                                className="object-contain rounded-full group-hover:scale-110 transition-transform duration-200 shadow-lg"
                            />
                        </div>
                    );
                })}
            </div>


            {/* Sekce s kontakty s animací (framer-motion) */}
            <motion.div
                className="flex items-center space-x-4 mt-4" // Zvýšený margin top
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram" // Statické aria-label
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                    <FaInstagram size={24} />
                </a>
                <span className="text-sm text-gray-600 dark:text-gray-400">|</span>
                <a
                    href={`mailto:${emailAddress}`}
                    aria-label="Email" // Statické aria-label
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 flex items-center space-x-1"
                >
                    <FaEnvelope size={24} />
                    <span className="text-sm">{emailAddress}</span>
                </a>
            </motion.div>
        </div>
    );
} 
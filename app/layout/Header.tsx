"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTwitter, FaFacebook, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Kanit } from 'next/font/google';

const kanit = Kanit({ subsets: ["latin"], weight: ["200", "400", "700", "600"] });

const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
];

const menuVariants = {
    open: {
        opacity: 1,
        height: "auto",
        visibility: "visible" as const,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
        },
        // Hide from keyboard/screen readers once the collapse finishes
        transitionEnd: { visibility: "hidden" as const },
    },
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen((open) => !open);
    };

    const linkClass = (path: string) =>
        `transition-colors ${pathname === path ? 'text-blue-400' : 'hover:text-gray-300'}`;

    return (
        <header className={`bg-gray-800 text-white py-2 ${kanit.className}`}>
            <div className="container mx-auto flex justify-between items-center px-4 md:px-12">
                <p className="text-xl font-bold"><Link href="/">Next Portfolio</Link></p>
                <nav className="hidden md:flex items-center" aria-label="Main">
                    <ul className="flex space-x-8 mr-12">
                        {menuItems.map((item, index) => (
                            <motion.li
                                key={item.label}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileTap={{ scale: 1.1 }}
                            >
                                <Link
                                    href={item.path}
                                    className={linkClass(item.path)}
                                    aria-current={pathname === item.path ? 'page' : undefined}
                                >
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="flex items-center space-x-4 ml-10">
                        <div aria-hidden="true">|</div>
                        <Link href="#" aria-label="Github" className="text-white hover:text-gray-300 transition-colors">
                            <FaGithub />
                        </Link>
                        <Link href="#" aria-label="Facebook" className="text-white hover:text-gray-300 transition-colors">
                            <FaFacebook />
                        </Link>
                        <Link href="#" aria-label="Twitter" className="text-white hover:text-gray-300 transition-colors">
                            <FaTwitter />
                        </Link>
                    </div>
                </nav>
                <button
                    type="button"
                    className="md:hidden p-2 -mr-2"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <motion.div
                id="mobile-menu"
                className="md:hidden overflow-hidden"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
            >
                <nav aria-label="Mobile">
                    <ul className="flex flex-col items-center space-y-4 bg-gray-800 py-4">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.path}
                                    className={linkClass(item.path)}
                                    aria-current={pathname === item.path ? 'page' : undefined}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.div>
        </header>
    );
};

export default Header;

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTwitter, FaFacebook, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Kanit } from 'next/font/google';

const kanit = Kanit({ subsets: ["latin"], weight: ["200", "400", "700", "600"] });

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuVariants = {
        open: {
            opacity: 1,
            height: "auto",
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
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        pressed: { scale: 1.1, transition: { duration: 0.1 } },
    };

    const handleItemClick = (index: number, path: string) => {
        setActiveIndex(index);
        setIsOpen(false); // Close mobile menu after item click
        setTimeout(() => {
            setActiveIndex(null);
            router.push(path);
        }, 300);
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`bg-gray-800 text-white py-2 ${kanit.className}`}>
            <div className="container mx-auto flex justify-between items-center px-4 md:px-12">
                <h1 className="text-xl font-bold"><Link href="/">Next Portfolio</Link></h1>
                <nav className="hidden md:flex items-center">
                    <ul className="flex space-x-12 mr-12">
                        {menuItems.map((item, index) => (
                            <motion.li
                                key={item.label}
                                variants={itemVariants}
                                initial="initial"
                                animate={activeIndex === index ? "pressed" : "animate"}
                                onClick={() => handleItemClick(index, item.path)}
                            >
                                <Link href={item.path} className="hover:text-gray-300 transition-colors">
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="flex items-center space-x-4 ml-10">
                        <div>|</div>
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
                <button className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <motion.div
                className="md:hidden overflow-hidden"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
            >
                <motion.ul
                    className="flex flex-col items-center space-y-4 bg-gray-800 py-4"
                    variants={itemVariants}
                >
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item.label}
                            variants={itemVariants}
                            initial="initial"
                            animate={activeIndex === index ? "pressed" : "animate"}
                            onClick={() => handleItemClick(index, item.path)}
                        >
                            <Link href={item.path} className="hover:text-gray-300 transition-colors">
                                {item.label}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </header>
    );
};

export default Header;
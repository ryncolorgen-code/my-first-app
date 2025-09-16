
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    const activeLinkClasses = "bg-primary text-white";
    const inactiveLinkClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
    
    const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
        `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

    return (
        <header className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center space-x-2">
                             <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.09A12.75 12.75 0 0112 3c4.217 0 8.138 2.102 10.5 5.513a2.25 2.25 0 01-2.47 2.118v-.089a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.091a3 3 0 00-5.78 1.128v.008a2.25 2.25 0 01-2.47 2.118H9.53z" />
                            </svg>
                            <span className="text-2xl font-bold text-primary">RynColor</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                        <NavLink to="/toolkit" className={navLinkStyle}>Designer's Toolkit</NavLink>
                        <NavLink to="/about" className={navLinkStyle}>About</NavLink>
                        <ThemeToggleButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                    </div>
                    <div className="md:hidden flex items-center">
                        <ThemeToggleButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/toolkit" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>Designer's Toolkit</NavLink>
                    <NavLink to="/about" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>About</NavLink>
                </div>
            )}
        </header>
    );
};

const ThemeToggleButton: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => (
     <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
        {isDarkMode ? (
             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ) : (
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        )}
    </button>
);


export default Header;

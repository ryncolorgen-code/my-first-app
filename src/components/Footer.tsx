
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-light-card dark:bg-dark-card shadow-inner">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-6">
                    <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy Policy</Link>
                    <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms of Use</Link>
                    <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</Link>
                </div>
                <div className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} RynColor. All rights reserved.</p>
                    <p className="mt-1">Made with ❤️ for designers.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

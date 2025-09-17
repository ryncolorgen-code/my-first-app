
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-light-text dark:text-dark-text mb-6">Privacy Policy</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                
                <h2 className="text-2xl font-bold pt-4">1. Introduction</h2>
                <p>Welcome to RynColor. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our service.</p>

                <h2 className="text-2xl font-bold pt-4">2. Information We Collect</h2>
                <p>We do not collect or store any personal information. Images you upload are sent to the Gemini API for processing and are not stored on our servers. Your images are handled according to Google's API privacy policies.</p>

                <h2 className="text-2xl font-bold pt-4">3. How We Use Information</h2>
                <p>Since we do not collect personal data, we do not use it. The uploaded images are used solely for the purpose of generating a color palette and are not used for any other purpose.</p>

                <h2 className="text-2xl font-bold pt-4">4. Cookies</h2>
                <p>We do not use cookies for tracking or collecting personal information. We may use local storage to save your preferences, such as your theme (light/dark mode).</p>
                
                <h2 className="text-2xl font-bold pt-4">5. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </div>
        </div>
    );
};

export default AboutPage;

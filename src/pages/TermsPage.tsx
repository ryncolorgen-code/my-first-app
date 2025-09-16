
import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-light-text dark:text-dark-text mb-6">Terms of Use</h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-bold pt-4">1. Acceptance of Terms</h2>
                <p>By accessing and using RynColor ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use the Service.</p>

                <h2 className="text-2xl font-bold pt-4">2. Description of Service</h2>
                <p>RynColor provides users with a tool to generate color palettes from images. This service is provided "as is" and is for personal and commercial use. You are responsible for any images you upload.</p>
                
                <h2 className="text-2xl font-bold pt-4">3. User Conduct</h2>
                <p>You agree not to use the Service to upload any images that are unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. You must own the rights to any images you upload or have permission to use them.</p>

                <h2 className="text-2xl font-bold pt-4">4. Disclaimer of Warranties</h2>
                <p>The Service is provided without warranties of any kind. We do not guarantee that the generated color palettes will be accurate or suitable for your purposes.</p>

                <h2 className="text-2xl font-bold pt-4">5. Limitation of Liability</h2>
                <p>In no event shall RynColor or its operators be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the Service.</p>
            </div>
        </div>
    );
};

export default TermsPage;

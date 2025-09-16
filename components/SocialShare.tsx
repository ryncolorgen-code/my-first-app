
import React, { useState } from 'react';

const SocialShare: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;
    const text = "Check out this awesome color palette generator!";

    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=&description=${encodeURIComponent(text)}`,
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 transition-colors"><IconFacebook /></a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"><IconX /></a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-green-500 transition-colors"><IconWhatsApp /></a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-700 transition-colors"><IconLinkedIn /></a>
            <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-red-600 transition-colors"><IconPinterest /></a>
            <button onClick={copyLink} className="p-2 text-gray-500 hover:text-primary transition-colors flex items-center space-x-1">
                {copied ? <IconCheck /> : <IconLink />}
                <span className="text-sm font-medium hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
        </div>
    );
};

// SVG Icons
const IconFacebook = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const IconX = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const IconWhatsApp = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.89L2 22l5.35-1.38c1.41.77 3.01 1.22 4.69 1.22h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.43 15.8c-.23-.11-1.34-.66-1.55-.74-.21-.08-.36-.11-.52.11-.16.23-.59.74-.72.88-.13.15-.26.16-.49.05-.23-.11-1-.36-1.89-1.16-.7-.63-1.16-1.41-1.3-1.66-.13-.25-.01-.38.1-.5.1-.11.23-.29.34-.43.11-.15.15-.25.23-.42.08-.16.04-.31-.01-.42-.05-.11-.52-1.25-.71-1.71-.19-.46-.38-.39-.52-.4-.13-.01-.29-.01-.44-.01-.16 0-.42.06-.63.31-.22.25-.83.81-.83 1.98 0 1.16.85 2.29 1 2.44.14.15 1.66 2.53 4.02 3.53.58.24 1.04.38 1.4.48.55.15 1.05.13 1.44.08.43-.06 1.34-.55 1.53-1.07.19-.53.19-1-.05-1.11z" /></svg>;
const IconLinkedIn = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>;
const IconPinterest = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.415-1.717-4.068-4.176-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.58-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621C9.926 21.579 10.944 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>;
const IconLink = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const IconCheck = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

export default SocialShare;

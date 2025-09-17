import React, { useState, useCallback } from 'react';
import { ColorInfo } from '../types';
import ColorSwatch from '../components/ColorSwatch';
import SocialShare from '../components/SocialShare';
import FAQItem from '../components/FAQItem';

const HomePage: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [palette, setPalette] = useState<ColorInfo[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // The initial useEffect and data state have been removed because they were causing the "Loading..." screen to be permanently displayed.

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(null);
            setImagePreview(null);
            setPalette(null);
            setError(null);

            if (!file.type.startsWith('image/')) {
                setError('Please select an image file (PNG, JPG, etc.).');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image size should not exceed 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > 512 || img.height > 512) {
                        setError('Image dimensions should not exceed 512x512 pixels.');
                    } else {
                        setImageFile(file);
                        setImagePreview(reader.result as string);
                    }
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = (reader.result as string).split(',')[1];
                resolve(result);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleGeneratePalette = useCallback(async () => {
        if (!imageFile) {
            setError('Please select an image first.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPalette(null);

        try {
            const base64Image = await getBase64(imageFile);
            // This is where you would call your backend to generate the palette
            // const generatedPalette = await generatePaletteFromImage(base64Image, imageFile.type);
            // setPalette(generatedPalette);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [imageFile]);

    return (
        <div className="space-y-16">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
                    Unlock Colors from Your Images
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    Instantly generate a beautiful color palette from any image. Perfect for designers, developers, and artists.
                </p>
            </section>
            
            <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-80">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Selected preview" className="max-h-full max-w-full object-contain rounded-md" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8L36 16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <p className="mt-2">Upload an image to start</p>
                                <p className="text-xs mt-1">(Max 1024x1024, 5MB)</p>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <label htmlFor="file-upload" className="w-full cursor-pointer bg-secondary hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg inline-flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <span>Choose an Image</span>
                        </label>
                        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        
                        <button 
                            onClick={handleGeneratePalette}
                            disabled={!imageFile || isLoading}
                            className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Generating...
                                </>
                            ) : (
                                "Generate Palette"
                            )}
                        </button>
                    </div>
                </div>
                {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
            </div>

            {isLoading && (
                <div className="text-center">
                    <p className="text-lg">AI is analyzing your image. Please wait a moment...</p>
                </div>
            )}

            {palette && (
                <section>
                    <h2 className="text-3xl font-bold text-center mb-8">Your Color Palette</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {palette.map((color, index) => (
                            <ColorSwatch key={index} colorInfo={color} />
                        ))}
                    </div>
                </section>
            )}

            <section className="text-center py-8">
                <h3 className="text-lg font-semibold mb-4">Share RynColor!</h3>
                <SocialShare />
            </section>

            <section className="max-w-4xl mx-auto">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
                        <p className="text-center text-gray-600 dark:text-gray-300">RynColor uses advanced AI to analyze the pixels of your uploaded image. It identifies dominant and complementary colors to create a harmonious and aesthetically pleasing palette, providing you with HEX, RGB, and HSL codes instantly.</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-6">Common Uses</h2>
                        <ul className="grid md:grid-cols-3 gap-6 text-center">
                            <li className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow"><strong className="block text-primary">Web Design:</strong> Create stunning website themes based on brand imagery.</li>
                            <li className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow"><strong className="block text-primary">Graphic Design:</strong> Ensure color consistency in logos, posters, and social media graphics.</li>
                            <li className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow"><strong className="block text-primary">Interior Decor:</strong> Find the perfect paint colors to match your favorite artwork or photo.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                           <FAQItem question="Is this tool free to use?">
                                <p>Yes, RynColor is completely free for everyone. You can generate as many palettes as you like.</p>
                            </FAQItem>
                            <FAQItem question="What image formats are supported?">
                                <p>We support all major image formats, including JPG, PNG, WEBP, and GIF. For best results, use a high-quality image.</p>
                            </FAQItem>
                            <FAQItem question="How are the colors chosen?">
                                <p>Our tool is powered by Google's Gemini AI, which analyzes your image to identify the most statistically relevant and aesthetically pleasing colors. It extracts a palette that accurately represents the image's mood and tone.</p>
                            </FAQItem>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

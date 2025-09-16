
import React from 'react';
import { AffiliateTool } from '../types';

const tools: AffiliateTool[] = [
    {
        name: 'Figma',
        logo: 'https://picsum.photos/seed/figma/64/64',
        description: 'The collaborative interface design tool. Create, test, and ship better designs from start to finish.',
        link: '#',
    },
    {
        name: 'Adobe Creative Cloud',
        logo: 'https://picsum.photos/seed/adobe/64/64',
        description: 'A collection of 20+ desktop and mobile apps and services for photography, design, video, web, UX, and more.',
        link: '#',
        discount: 'DESIGN20'
    },
    {
        name: 'Sketch',
        logo: 'https://picsum.photos/seed/sketch/64/64',
        description: 'The definitive platform for digital design. Create, prototype, collaborate, and bring your ideas to life.',
        link: '#',
    },
    {
        name: 'Canva',
        logo: 'https://picsum.photos/seed/canva/64/64',
        description: 'An easy-to-use design platform for creating social media graphics, presentations, posters, and other visual content.',
        link: '#',
        discount: 'CANVALOVE'
    },
    {
        name: 'Webflow',
        logo: 'https://picsum.photos/seed/webflow/64/64',
        description: 'Build responsive websites visually. The all-in-one platform for professional web design, with no code required.',
        link: '#',
    },
     {
        name: 'Spline',
        logo: 'https://picsum.photos/seed/spline/64/64',
        description: 'A friendly 3D design tool for the web. Easily create and publish 3D web experiences.',
        link: '#',
        discount: '3DPOWER'
    },
];

const ToolkitPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
                    Designer's Toolkit
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    A curated list of essential tools and resources to supercharge your design workflow.
                </p>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                    <div key={index} className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6 flex flex-col transition-transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <img src={tool.logo} alt={`${tool.name} logo`} className="w-16 h-16 rounded-full mr-4"/>
                            <h2 className="text-2xl font-bold">{tool.name}</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{tool.description}</p>
                        {tool.discount && (
                            <div className="mb-4 text-center">
                                <p className="text-sm">Discount Code:</p>
                                <p className="font-mono text-lg p-2 bg-gray-100 dark:bg-gray-800 rounded-md inline-block">
                                    {tool.discount}
                                </p>
                            </div>
                        )}
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center bg-primary hover:bg-primary-focus text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Visit {tool.name}
                        </a>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ToolkitPage;

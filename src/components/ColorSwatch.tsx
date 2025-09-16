
import React, { useState } from 'react';
import { ColorInfo } from '../types';

interface ColorSwatchProps {
    colorInfo: ColorInfo;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorInfo }) => {
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(text);
        setTimeout(() => setCopiedValue(null), 2000);
    };

    const isLightColor = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    };

    const textColor = isLightColor(colorInfo.hex) ? 'text-black' : 'text-white';

    const renderCopyableField = (label: string, value: string) => (
        <div 
            className="flex justify-between items-center text-xs p-2 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer"
            onClick={() => handleCopy(value)}
        >
            <span className="font-mono">{label}</span>
            <div className="flex items-center space-x-2">
                <span>{value}</span>
                {copiedValue === value ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
            </div>
        </div>
    );

    return (
        <div className="rounded-lg shadow-lg overflow-hidden flex flex-col" style={{ backgroundColor: colorInfo.hex }}>
            <div className={`p-4 flex-grow ${textColor}`}>
                <h3 className="font-bold text-lg capitalize">{colorInfo.name}</h3>
                <div className="mt-4 space-y-2">
                    {renderCopyableField('HEX', colorInfo.hex)}
                    {renderCopyableField('RGB', colorInfo.rgb)}
                    {renderCopyableField('HSL', colorInfo.hsl)}
                </div>
            </div>
        </div>
    );
};

export default ColorSwatch;


import { GoogleGenAI, Type } from "@google/genai";
import { ColorInfo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generatePaletteFromImage = async (
    base64Image: string,
    mimeType: string
): Promise<ColorInfo[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: 'Extract a cohesive and visually appealing color palette of exactly 8 colors from this image. For each color, provide its common name, HEX code (e.g., #RRGGBB), RGB value (e.g., "rgb(r, g, b)"), and HSL value (e.g., "hsl(h, s%, l%)"). Ensure the colors are distinct and represent the main tones of the image.',
                    },
                ],
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            hex: {
                                type: Type.STRING,
                                description: 'The hexadecimal code for the color.',
                            },
                            rgb: {
                                type: Type.STRING,
                                description: 'The RGB value of the color, formatted as "rgb(r, g, b)".',
                            },
                             hsl: {
                                type: Type.STRING,
                                description: 'The HSL value of the color, formatted as "hsl(h, s%, l%)".',
                            },
                            name: {
                                type: Type.STRING,
                                description: 'A common, descriptive name for the color.',
                            },
                        },
                        required: ["hex", "rgb", "hsl", "name"],
                    },
                },
            },
        });

        const jsonString = response.text;
        const palette = JSON.parse(jsonString);

        if (Array.isArray(palette) && palette.length > 0) {
            return palette as ColorInfo[];
        } else {
            throw new Error('AI did not return a valid palette.');
        }

    } catch (error) {
        console.error('Error generating palette with Gemini API:', error);
        throw new Error('Failed to generate color palette. Please check the API key and try again.');
    }
};

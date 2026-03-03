
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '', vertexai: true });

export const scanTicket = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: 'Analiza este ticket de gasto y extrae: nombre del establecimiento (vendor), fecha (date en formato YYYY-MM-DD), importe total (amount como número) y una categoría sugerida (category). Responde solo en JSON.',
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vendor: { type: Type.STRING },
            date: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            category: { type: Type.STRING },
          },
          required: ['vendor', 'date', 'amount', 'category'],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error scanning ticket:', error);
    throw error;
  }
};

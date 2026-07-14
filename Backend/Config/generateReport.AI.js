import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});


const generateReport = async ({prompt,reportSchema,systemInstructions}) => {
    try {
        
        // Convert to JSON Schema using Zod v4's native toJSONSchema()
        const rawSchema = reportSchema.toJSONSchema();
        
        // Strip the '$schema' key to prevent the SDK from stripping responseSchema
        const { $schema, ...responseSchema } = rawSchema;
        const response = await ai.models.generateContent({
            // model: "gemini-2.5-flash",
            // model: "gemini-2.5-flash-lite",
            model: "gemini-3.1-flash-lite",
            
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                systemInstructions: systemInstructions,
            }
        });
        const parsedJson = JSON.parse(response.text);
        return parsedJson;
    } catch (error) {
        console.error("Failed to generate report:", error);
    }
};

export default generateReport;
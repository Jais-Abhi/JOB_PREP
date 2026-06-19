import { GoogleGenAI } from "@google/genai";
import interviewReportSchema from "./interviewReport.schema.js"


const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});


const generateReport = async ({resume,selfDescription,jobDescription}) => {
    try {
        const prompt = `Generate a structured interview report based on the following information:
            Resume : ${resume}
            self Description : ${selfDescription}
            job Description : ${jobDescription}
        `;
        // Convert to JSON Schema using Zod v4's native toJSONSchema()
        const rawSchema = interviewReportSchema.toJSONSchema();
        
        // Strip the '$schema' key to prevent the SDK from stripping responseSchema
        const { $schema, ...responseSchema } = rawSchema;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });
        const parsedJson = JSON.parse(response.text);
        console.log(parsedJson);
        return parsedJson;
    } catch (error) {
        console.error("Failed to generate report:", error);
    }
};

export default generateReport;
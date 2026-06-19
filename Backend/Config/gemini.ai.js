import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { jobDescription, selfDescription } from "./test.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore : z.number().describe("The match score between the candidate's resume or self description and the job requirements, ranging from 0 to 100."),
    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question asked during the interview."),
        intension : z.string().describe("The intention behind the question asked by the interviewer."),
        answer : z.string().describe("The candidate's answer to the technical question."),
    })).describe("A list of technical questions asked during the interview, along with the candidate's answers and the interviewer's intentions."),
    behaviourQuestions : z.array(z.object({
        question : z.string().describe("The behavioral question asked during the interview."),
        intension : z.string().describe("The intention behind the question asked by the interviewer."),
        answer : z.string().describe("The candidate's answer to the behavioral question."),
    })).describe("A list of behavioral questions asked during the interview, along with the candidate's answers and the interviewer's intentions."),
});

const prompt = `Generate a structured interview report based on the following information:
self Description: ${selfDescription}
job Description: ${jobDescription}
`;

const generateReport = async () => {
    try {
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
        console.log(parsedJson.matchScore);
        console.log(parsedJson.technicalQuestions);
        console.log(parsedJson.behaviourQuestions);
    } catch (error) {
        console.error("Failed to generate report:", error);
    }
};

export default generateReport;
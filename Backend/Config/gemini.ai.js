import {GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const generateReport = async ()=>{
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash-lite",
        contents: "what is interview",
    })
    console.log(response.text);
}

export default generateReport;
import express from "express";
import { PDFParse } from "pdf-parse";

const generateReportController = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;
        let candidateProfileText = "";

        // If a file (resume) was uploaded, parse it
        if (req.file && req.file.buffer) {
            const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
            const pdfData = await parser.getText();
            candidateProfileText = pdfData.text;
            console.log("--- Extracted text from PDF Resume ---");
            console.log(candidateProfileText);
        } else if (selfDescription) {
            // Otherwise, use the written self description
            candidateProfileText = selfDescription;
            console.log("--- Using provided Self Description ---");
        }

        console.log("Job Description:", jobDescription);
        
        // At this point, you have both `candidateProfileText` and `jobDescription`
        // ready to be sent to your AI model.
        
        res.status(200).json({ 
            success: true, 
            message: "Data successfully extracted. Ready for AI processing." 
        });

    } catch (error) {
        console.log("Error extracting data:", error);
        res.status(500).json({ success: false, message: "Failed to extract data" });
    }
}

export {generateReportController}
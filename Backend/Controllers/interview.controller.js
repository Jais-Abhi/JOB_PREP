import express from "express";
import { PDFParse } from "pdf-parse";
import generateReport from "../services/Interview_AI/interview.report.js";
import InterviewReport from "../Models/interview.model.js";
import User from "../Models/user.model.js";

const generateReportController = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;
        let resumeText = ""
        // If a file (resume) was uploaded, parse it
        if (req.file && req.file.buffer) {
            const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
            const pdfData = await parser.getText();
            resumeText = pdfData.text;
            console.log("--- Extracted text from PDF Resume ---");
            console.log(resumeText);
        }
        console.log("self Description:", selfDescription);
        console.log("Job Description:", jobDescription);
        
        // At this point, you have both `resumeText` and `jobDescription`
        // ready to be sent to your AI model.

        const report = await generateReport({resume:resumeText,selfDescription:selfDescription,jobDescription:jobDescription});
        console.log(report);

        const interviewReport = await InterviewReport.create({
            jobDescription : jobDescription,
            resume : resumeText,
            selfDescription : selfDescription,
            title : report.title,
            matchScore : report.matchScore,
            technicalQuestions : report.technicalQuestions,
            behaviourQuestions : report.behaviourQuestions,
            skillGaps : report.skillGaps,
            preparationPlans : report.preparationPlans,
            userId : req._id
        })

        const user = await User.findByIdAndUpdate(
            req._id,
            { $push: { interviewReports: interviewReport._id } },
            { new: true }
        )

        res.status(201).json({ 
            success: true, 
            message: "Interview report generated and saved successfully.",
            interviewReport,
        });

    } catch (error) {
        console.log("Error extracting data:", error);
        res.status(500).json({ success: false, message: "Failed to extract data" });
    }
}

export {generateReportController}
import { PDFParse } from "pdf-parse";
import generateResumeScoreReport from "../services/resume/generateATS.report.js";

const generateResumeScoreController = async (req, res) => {
    try{
        console.log("controller ats resume")
        console.log(req.file,req.file.buffer);

        let resumeText = ""
        if (req.file && req.file.buffer) {
                    const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
                    const pdfData = await parser.getText();
                    resumeText = pdfData.text;
        
                }
                console.log(resumeText)
        const report = await generateResumeScoreReport({ resume: resumeText });
        res.status(200).json(report);

    } catch (error) {
        console.error("Error generating resume score report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export { generateResumeScoreController }
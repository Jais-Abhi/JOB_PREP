import { PDFParse } from "pdf-parse";
import generateResumeScoreReport from "../services/resume/generateATS.report.js";
import ResumeReport from "../Models/resume.report.schema.js"
import User from "../Models/user.model.js";
const generateResumeScoreController = async (req, res) => {
    try{
        console.log("controller ats resume")
        // console.log(req.file,req.file.buffer);

        let resumeText = ""
        if (req.file && req.file.buffer) {
                    const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
                    const pdfData = await parser.getText();
                    resumeText = pdfData.text;
        
                }
                // console.log(resumeText)
        const report = await generateResumeScoreReport({ resume: resumeText });
        const userId = req._id; 
        console.log(userId)
        if(!userId){
            return res.status(400).json({ error: "not authenticated" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new ResumeReport document
        const newReport = await ResumeReport.create({
            userId: userId,
            success: report.success,
            message: report.message,
            report: report.report,
            resume: report.resume,
        });

        await user.updateOne({ $push: { resumeReports: newReport._id } });
        console.log(newReport)

        res.status(200).json({success : true, message : "Report generated successfully", reportId: newReport._id});

    } catch (error) {
        console.error("Error generating resume score report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getReportController = async (req, res) => {
    try {
        const { _id } = req.params;
        const report = await ResumeReport.findById(_id).select('-resume -__v').lean();
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.status(200).json({success : true, message : "Report fetched successfully", report: report});
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { generateResumeScoreController ,getReportController }
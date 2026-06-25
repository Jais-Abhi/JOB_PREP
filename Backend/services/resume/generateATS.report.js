import generateReport from "../../Config/generateReport.AI.js";
import resumeATSReportSchema from "./resumeATS.report.schema.js";

const generateResumeScoreReport = async({resume})=>{
const prompt = `
You are an expert ATS Resume Analyzer, Resume Parser, Technical Recruiter, and Hiring Manager.

Your task is to analyze the following resume and generate a complete ATS report.

========================
RESUME
========================

${resume}

========================
YOUR TASK
========================

Carefully read the resume from top to bottom.

Generate a complete ATS analysis by following the provided JSON schema exactly.

Your responsibilities include:

1. Validate the Resume
- Determine whether the uploaded content is actually a resume.
- If the document is empty, corrupted, unreadable, or not a resume:
  - success = false
  - provide an appropriate message
  - leave remaining fields empty according to the schema.
- Never fabricate information.

2. Extract Resume Information

Extract every piece of information available in the resume.

This includes:

• Contact Information
• Professional Summary
• Career Objective
• Skills
• Work Experience
• Internships
• Projects
• Education
• Certifications
• Achievements
• Awards
• Publications
• Research
• Volunteer Experience
• Leadership
• Extracurricular Activities
• Languages
• Interests
• Hobbies
• References
• Patents
• Training
• Workshops
• Conferences
• Social Profiles
• Custom Sections
• Additional Information

Rules:

• Only extract information explicitly present.
• Never guess missing values.
• Use null for missing single values.
• Use [] for missing arrays.
• Preserve chronological order.
• Preserve original project descriptions whenever possible.
• Normalize extracted values without changing their meaning.

========================
ATS SCORING
========================

Evaluate the resume exactly like an Applicant Tracking System.

Assign scores independently for every criterion.

Award points only when the resume actually satisfies the requirement.

Do not inflate scores.

Do not guess.

Do not reward missing information.

Every criterion score must remain within its allowed maximum.

Every section score must equal the sum of its criteria.

The overall ATS score must equal the sum of all section scores.


========================
IMPORTANT RULES
========================

- Never hallucinate.
- Never fabricate companies.
- Never fabricate dates.
- Never fabricate certifications.
- Never fabricate projects.
- Never fabricate achievements.
- Never infer missing information.
- Never generate fake URLs.
- Never exceed scoring limits.
- Use null where appropriate.
- Use empty arrays where appropriate.
- Ensure every extracted field matches the provided schema.
- Ensure every score is mathematically correct.
- Ensure overall ATS score equals the sum of all section scores.
- Return ONLY valid structured JSON matching the supplied schema.
- Do not include markdown, explanations, comments, or additional text outside the JSON response.
`;

    const report = await generateReport({prompt,reportSchema : resumeATSReportSchema});
    console.log("resume report: ",report)
    return report;
}

export default generateResumeScoreReport;
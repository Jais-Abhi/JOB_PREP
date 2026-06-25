import generateReport from "../../Config/generateReport.AI.js";
import interviewReportSchema from "./interviewReport.schema.js";

const generateInterviewReport = async({resume,selfDescription,jobDescription})=>{

    const prompt = `You are an experienced technical recruiter and interview preparation assistant.

Your task is to carefully analyze the provided Resume, Self Description, and Job Description, and generate a comprehensive interview report.

### Step 1: Input Validation
You MUST strictly validate the input before generating any report. Return \`success=false\` and a clear, user-friendly \`message\` explaining WHY report generation failed when ANY of these conditions occur:

1. Resume Validation:
   - Resume is empty.
   - Resume contains only random words, symbols or numbers.
   - Resume is too short to determine candidate skills.
   - Resume does not resemble a professional resume.
   - Resume appears corrupted or meaningless.

2. Self Description Validation:
   - Self description is empty when resume is also empty.
   - Self description contains meaningless text.
   - Self description provides no useful information about the candidate.

3. Job Description Validation:
   - Job description is empty.
   - Job description is too short.
   - Job description contains random text.
   - Job description does not resemble a real job description.
   - Job description is incomplete.

4. Candidate vs Job Validation:
   - Candidate profile has almost no relation to the job.
   - Required skills cannot be compared.
   - There is insufficient information to calculate a realistic match score.
   - The candidate information and job requirements are unrelated.
   - The AI cannot confidently evaluate the candidate.

If validation fails:
- Set \`success: false\`
- Provide a clear \`message\` explaining the failure.
- Set \`title\` and \`matchScore\` to null.
- Set all arrays (\`technicalQuestions\`, \`behaviouralQuestions\`, \`skillGaps\`, \`preparationPlans\`) to empty arrays \`[]\`.

### Step 2: Strict Generation Rules (If Validation Succeeds)
Only when \`success=true\`, generate the report adhering to the following STRICT rules:
1. Never hallucinate.
2. Never invent candidate information, missing experience, projects, or skills.
3. Never guess education or certifications.
4. Never assume missing information.
5. Never calculate a fake match score.
6. Never generate interview questions from fabricated data.
7. Never create a preparation roadmap when the input is invalid.
8. Do not repeat questions or skills.
9. Ensure every recommendation is directly based on the supplied information.

### Step 3: Report Content
For valid inputs, your report must be realistic, accurate, concise, practical, and personalized:
- Generate a concise report \`title\`.
- Calculate a realistic \`matchScore\` (0-100).
- Generate \`technicalQuestions\` based ONLY on the candidate profile and job description. For each, explain the interviewer's \`intension\` and provide a high-quality expected \`answer\`.
- Generate \`behaviouralQuestions\` relevant to the candidate's profile with \`intension\` and expected \`answer\`.
- Identify genuine \`skillGaps\` and assign \`severity\` (low, medium, high) accurately.
- Generate a realistic multi-day \`preparationPlans\` ordered by priority.

INPUT DATA:
Resume: """${resume}"""
Self Description: """${selfDescription}"""
Job Description: """${jobDescription}"""
`;

   const report  = await generateReport({prompt,reportSchema : interviewReportSchema});
   console.log("interview report: ",report)
   return report;

}

export default generateInterviewReport;

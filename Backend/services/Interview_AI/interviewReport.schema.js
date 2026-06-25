import { z } from "zod";

const interviewReportSchema = z.object({
    success: z.boolean().describe("Whether the input validation succeeded and the report generation was possible."),
    message: z.string().nullable().describe("A user-friendly message explaining why report generation failed, or null if successful."),
    title : z.string().nullable().describe("The title of the interview report."),
    matchScore : z.number().nullable().describe("The match score between the candidate's resume or self description and the job requirements, ranging from 0 to 100."),
    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question asked during the interview."),
        intension : z.string().describe("The intention behind the question asked by the interviewer."),
        answer : z.string().describe("The candidate's expected answer to the technical question."),
    })).describe("A list of technical questions asked during the interview, along with the candidate's answers and the interviewer's intentions."),
    behaviourQuestions : z.array(z.object({
        question : z.string().describe("The behavioral question asked during the interview."),
        intension : z.string().describe("The intention behind the question asked by the interviewer."),
        answer : z.string().describe("The candidate's expected answer to the behavioral question."),
    })).describe("A list of behavioral questions asked during the interview, along with the candidate's answers and the interviewer's intentions."),
    skillGaps : z.array(z.object({
        skill : z.string().describe("The skill that is lacking in the candidate's profile."),
        severity : z.enum(["low", "medium", "high"]).describe("The severity of the skill gap."),
    })).describe("A list of skill gaps in the candidate's profile."),
    preparationPlans : z.array(z.object({
        day : z.number().describe("The day of the week for the preparation plan."),
        focusArea : z.string().describe("The focus area for the preparation plan."),
        tasks : z.array(z.string().describe("The tasks for the preparation plan.")).describe("The tasks for the preparation plan."),
    })).describe("A list of preparation plans for the candidate."),
});

export default interviewReportSchema;
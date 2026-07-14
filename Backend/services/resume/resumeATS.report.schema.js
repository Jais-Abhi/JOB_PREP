import { z } from "zod";

// ─── Reusable primitives ──────────────────────────────────────────────────────

const nullableString = z.string().nullable();
const nullableNumber = z.number().nullable();
const stringArray    = z.array(z.string());

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

/**
 * Scoring breakdown mirrors the resumeATS.score.json weight system.
 * Every criterion holds the points the candidate actually earned (not the max).
 */
const contactSchema = z.object({
    fullName:    nullableString.describe("Candidate's full name as written on the resume."),
    headline:    nullableString.describe("Professional headline or tagline directly below the name, if present."),
    email:       nullableString.describe("Primary professional email address."),
    phone:       nullableString.describe("Contact phone number including country code if present."),
    location:    nullableString.describe("City, state or country as listed on the resume."),
    linkedin:    nullableString.describe("LinkedIn profile URL."),
    github:      nullableString.describe("GitHub profile URL."),
    portfolio:   nullableString.describe("Personal portfolio or personal website URL."),
    leetcode:    nullableString.describe("LeetCode profile URL."),
    otherLinks:  stringArray.describe("Any additional profile or social links not covered above."),
}).describe("All contact and profile-link information extracted from the top section of the resume.");

const skillsSchema = z.object({
    technicalSkills: stringArray.describe("Technical concepts not covered by other categories."),
    programmingLanguages: stringArray.describe("Programming languages listed (e.g. JavaScript, Python, Java)."),
    frameworks:           stringArray.describe("Frameworks explicitly listed (e.g. React, Django, Spring Boot)."),
    databases:            stringArray.describe("Databases and data stores (e.g. MySQL, MongoDB, Redis)."),
    cloud:                stringArray.describe("Cloud platforms and services (e.g. AWS, Azure, GCP)."),
    devOps:               stringArray.describe("DevOps / infrastructure tools (e.g. Docker, Kubernetes, Jenkins)."),
    tools:                stringArray.describe("Developer tools and IDEs (e.g. Git, Postman, Jira, Figma)."),
    softSkills:           stringArray.describe("Soft / interpersonal skills (e.g. Communication, Leadership)."),
    other:                stringArray.describe("Any skill that does not fit the categories above."),
}).describe("Complete skills inventory extracted and categorised from the resume without duplicates.");

const experienceItemSchema = z.object({
    jobTitle:        nullableString.describe("Official job title held in this role."),
    company:         nullableString.describe("Name of the employer or organisation."),
    employmentType:  nullableString.describe("Employment type: Full-time, Part-time, Contract, Freelance, Internship etc."),
    location:        nullableString.describe("Office location or 'Remote' / 'Hybrid'."),
    startDate:       nullableString.describe("Start date of this role (month and year, e.g. 'Jan 2022')."),
    endDate:         nullableString.describe("End date of this role, or null if currently working here."),
    currentlyWorking:z.boolean().describe("True if this is the candidate's current position."),
    description:     nullableString.describe("Overall role description or summary paragraph."),
    achievements:    stringArray.describe("Quantified or notable achievements in this role (e.g. 'Reduced load time by 40%')."),
    technologies:    stringArray.describe("Technologies, languages, or tools specifically used in this role."),
}).describe("A single work experience entry.");


const projectItemSchema = z.object({
    title:            nullableString.describe("Project name or title."),
    role:             nullableString.describe("The candidate's role in this project (e.g. 'Lead Developer', 'Contributor')."),
    description:      nullableString.describe("Clear description of what the project does and the problem it solves."),
    technologies:     stringArray.describe("Technologies, frameworks, and libraries used to build this project."),
    githubUrl:        nullableString.describe("GitHub repository link for this project."),
    liveUrl:          nullableString.describe("Live deployment or demo URL for this project."),
    documentationUrl: nullableString.describe("Link to project documentation, if any."),
    startDate:        nullableString.describe("Start date of the project."),
    endDate:          nullableString.describe("End date or expected completion date of the project."),
    achievements:     stringArray.describe("Measurable impact or key achievements of this project."),
    teamSize:         nullableNumber.describe("Number of team members involved in this project, or null if solo."),
}).describe("A single project entry.");

const educationItemSchema = z.object({
    degree:           nullableString.describe("Academic degree obtained or in progress (e.g. 'B.Tech', 'M.Sc', '12th Standard')."),
    fieldOfStudy:     nullableString.describe("Major, specialisation, or field of study (e.g. 'Computer Science')."),
    institution:      nullableString.describe("Name of the school, college, or university."),
    location:         nullableString.describe("City and country of the institution."),
    boardOrUniversity:nullableString.describe("Affiliated board or university name (e.g. 'CBSE', 'Mumbai University')."),
    startYear:        nullableString.describe("Year the candidate started this program."),
    endYear:          nullableString.describe("Year the candidate completed or expects to complete this program."),
    cgpa:             nullableString.describe("CGPA or GPA score if mentioned."),
    percentage:       nullableString.describe("Percentage score if mentioned."),
    grade:            nullableString.describe("Letter grade or grade band if mentioned."),
}).describe("A single education entry.");

const certificationItemSchema = z.object({
    title:         nullableString.describe("Name of the certification or course."),
    issuer:        nullableString.describe("Organisation that issued the certification (e.g. 'Coursera', 'AWS', 'Google')."),
    issueDate:     nullableString.describe("Date when the certification was issued."),
    expiryDate:    nullableString.describe("Expiry date of the certification, or null if it does not expire."),
    credentialId:  nullableString.describe("Unique credential ID provided by the issuer."),
    credentialUrl: nullableString.describe("URL to verify the credential online."),
}).describe("A single certification or online course entry.");

const achievementItemSchema = z.object({
    title:       nullableString.describe("Title or heading of the achievement (e.g. 'Hackathon Winner')."),
    description: nullableString.describe("Brief description of the achievement."),
    date:        nullableString.describe("Date or year the achievement was earned."),
}).describe("A single standalone achievement entry.");

const languageItemSchema = z.object({
    language:    nullableString.describe("Human language spoken (e.g. 'English', 'Hindi')."),
    proficiency: nullableString.describe("Proficiency level (e.g. 'Native', 'Fluent', 'Intermediate', 'Basic')."),
}).describe("A single language proficiency entry.");


const customSectionItemSchema = z.object({
    title:   nullableString.describe("Title of this custom or non-standard resume section."),
    content: nullableString.describe("Full text content of the custom section."),
}).describe("A single entry for any non-standard resume section the candidate has added.");

// ─── Score breakdown schema (mirrors resumeATS.score.json weights) ─────────────

const scoreBreakdownSchema = z.object({
  totalScore: z.number().describe("Overall ATS score out of 100."),
  sections: z.object({
    contactInformation: z.number().describe("Score out of 10."),
    resumeStructure: z.number().describe("Score out of 15."),
    atsFormatting: z.number().describe("Score out of 20."),
    skills: z.number().describe("Score out of 15."),
    experience: z.number().describe("Score out of 15."),
    projects: z.number().describe("Score out of 15."),
    education: z.number().describe("Score out of 5."),
    grammarAndReadability: z.number().describe("Score out of 5."),
  }),
})
// ─── Feedback & improvement suggestions ──────────────────────────────────────

const improvementSuggestionSchema = z.object({
    section:    z.string().describe("The resume section this suggestion applies to (e.g. 'Contact Information', 'Projects', 'Skills')."),
    issue:      z.string().describe("A clear description of the problem or gap identified in this section."),
    suggestion: z.string().describe("A specific, actionable recommendation to improve the section and raise the ATS score."),
    impact:     z.enum(["low", "medium", "high"]).describe("Expected impact of applying this suggestion on the overall ATS score: low, medium, or high."),
}).describe("Give improvement suggestions for all sections that have low scores as max.");

const strengthSchema = z.object({
    section:     z.string().describe("The resume section where this strength was observed."),
    observation: z.string().describe("A specific positive observation about this section (e.g. 'Well-quantified achievements with metrics')."),
}).describe("A single notable strength found in the resume.");

// ─── Root schema ─────────────────────────────────────────────────────────────

const resumeATSReportSchema = z.object({

    // ── Validation result ────────────────────────────────────────────────────
    success: z.boolean()
        .describe("True if the resume contains sufficient professional content to produce a meaningful ATS report. False if the input is empty, corrupted, or not a valid resume."),

    message: z.string().nullable()
        .describe("A user-friendly message explaining why processing failed (e.g. 'The uploaded document does not appear to be a resume.'). Null when success is true."),

    // ── Extracted resume data ─────────────────────────────────────────────────
    resume: z.object({

        contact: contactSchema,

        professionalSummary: nullableString
            .describe("The professional summary or profile statement from the resume, verbatim or lightly normalised."),

        objective: nullableString
            .describe("The career objective statement from the resume, if separate from the professional summary."),

        skills:       skillsSchema,
        experience:   z.array(experienceItemSchema).describe("All work experience entries extracted from the resume, ordered most-recent first."),
        projects:     z.array(projectItemSchema).describe("All personal, academic, or professional project entries extracted from the resume."),
        education:    z.array(educationItemSchema).describe("All education entries extracted from the resume, ordered most-recent first."),
        certifications:       z.array(certificationItemSchema).describe("All certifications and online course completions."),
        achievements:         z.array(achievementItemSchema).describe("All standalone achievement or accomplishment entries."),
        extracurricularActivities: z.array(z.object({
            title:       nullableString.describe("Title of the extracurricular activity."),
            description: nullableString.describe("Brief description of the activity and the candidate's involvement."),
        })).describe("Extracurricular activities listed on the resume."),
        languages:   z.array(languageItemSchema).describe("Human languages and proficiency levels listed."),
        interests:   stringArray.describe("Personal interests or hobbies listed as a short array of strings."),
        hobbies:     stringArray.describe("Hobbies listed explicitly on the resume."),

        customSections: z.array(customSectionItemSchema).describe("Any non-standard or custom sections the candidate added to their resume."),
        other: z.object({
            additionalInformation: nullableString.describe("Miscellaneous information that does not fit any other section."),
            notes:                 nullableString.describe("Internal parser notes about ambiguous or unclear resume content."),
        }).describe("A catch-all section for any additional or unclassified resume content."),

    }).describe("All data extracted directly from the uploaded resume."),

    // ── AI-generated analysis ─────────────────────────────────────────────────
    report: z.object({

        // ── ATS score breakdown ───────────────────────────────────────────────────
        scoreBreakdown: scoreBreakdownSchema,

        // ── Qualitative feedback ──────────────────────────────────────────────────
        feedback: z.object({

            strengths: z.array(strengthSchema)
                .describe("A list of specific strengths and positive observations about the resume and make sure all the less score section include."),

            improvements: z.array(improvementSuggestionSchema)
                .describe("A prioritised list of actionable improvement suggestions to increase the ATS score."),

            overallFeedback: z.string().nullable()
                .describe("A concise overall summary of the resume quality, ATS readiness, and top 2–3 priorities for improvement. Null when success is false."),

        }).describe("Qualitative feedback and improvement suggestions generated by the AI."),

    }).describe("AI-generated ATS analysis report."),

});

export default resumeATSReportSchema;

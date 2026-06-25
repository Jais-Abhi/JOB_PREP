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
const sectionScoreSchema = () =>
    z.object({
        score: z.number().describe("Points earned by the candidate for this section (out of the section maximum)."),
        criteria: z.object().describe("Point breakdown per individual criterion within this section."),
    });

const contactSchema = z.object({
    fullName:    nullableString.describe("Candidate's full name as written on the resume."),
    headline:    nullableString.describe("Professional headline or tagline directly below the name, if present."),
    email:       nullableString.describe("Primary professional email address."),
    phone:       nullableString.describe("Contact phone number including country code if present."),
    location:    nullableString.describe("City, state or country as listed on the resume."),
    linkedin:    nullableString.describe("LinkedIn profile URL."),
    github:      nullableString.describe("GitHub profile URL."),
    portfolio:   nullableString.describe("Personal portfolio or personal website URL."),
    website:     nullableString.describe("Any other personal or company website link."),
    leetcode:    nullableString.describe("LeetCode profile URL."),
    codeforces:  nullableString.describe("Codeforces profile URL."),
    hackerrank:  nullableString.describe("HackerRank profile URL."),
    codechef:    nullableString.describe("CodeChef profile URL."),
    behance:     nullableString.describe("Behance portfolio URL (relevant for designers)."),
    dribbble:    nullableString.describe("Dribbble portfolio URL (relevant for designers)."),
    otherLinks:  stringArray.describe("Any additional profile or social links not covered above."),
}).describe("All contact and profile-link information extracted from the top section of the resume.");

const skillsSchema = z.object({
    technical:            stringArray.describe("General technical skills (e.g. REST APIs, Microservices, CI/CD)."),
    programmingLanguages: stringArray.describe("Programming languages listed (e.g. JavaScript, Python, Java)."),
    frameworks:           stringArray.describe("Frameworks explicitly listed (e.g. React, Django, Spring Boot)."),
    libraries:            stringArray.describe("Libraries explicitly listed (e.g. NumPy, Pandas, Redux)."),
    databases:            stringArray.describe("Databases and data stores (e.g. MySQL, MongoDB, Redis)."),
    cloud:                stringArray.describe("Cloud platforms and services (e.g. AWS, Azure, GCP)."),
    devOps:               stringArray.describe("DevOps / infrastructure tools (e.g. Docker, Kubernetes, Jenkins)."),
    tools:                stringArray.describe("Developer tools and IDEs (e.g. Git, Postman, Jira, Figma)."),
    operatingSystems:     stringArray.describe("Operating systems mentioned (e.g. Linux, Windows, macOS)."),
    softSkills:           stringArray.describe("Soft / interpersonal skills (e.g. Communication, Leadership)."),
    other:                stringArray.describe("Any skill that does not fit the categories above."),
}).describe("Complete skills inventory extracted and categorised from the resume.");

const experienceItemSchema = z.object({
    jobTitle:        nullableString.describe("Official job title held in this role."),
    company:         nullableString.describe("Name of the employer or organisation."),
    employmentType:  nullableString.describe("Employment type: Full-time, Part-time, Contract, Freelance, etc."),
    location:        nullableString.describe("Office location or 'Remote' / 'Hybrid'."),
    startDate:       nullableString.describe("Start date of this role (month and year, e.g. 'Jan 2022')."),
    endDate:         nullableString.describe("End date of this role, or null if currently working here."),
    currentlyWorking:z.boolean().describe("True if this is the candidate's current position."),
    description:     nullableString.describe("Overall role description or summary paragraph."),
    responsibilities:stringArray.describe("List of primary responsibilities in this role."),
    achievements:    stringArray.describe("Quantified or notable achievements in this role (e.g. 'Reduced load time by 40%')."),
    technologies:    stringArray.describe("Technologies, languages, or tools specifically used in this role."),
    companyWebsite:  nullableString.describe("Company website URL if mentioned."),
}).describe("A single work experience entry.");

const internshipItemSchema = z.object({
    role:        nullableString.describe("Internship role or title."),
    company:     nullableString.describe("Organisation where the internship was completed."),
    location:    nullableString.describe("Location of the internship, or 'Remote'."),
    startDate:   nullableString.describe("Start date of the internship."),
    endDate:     nullableString.describe("End date of the internship."),
    description: nullableString.describe("Brief description of the internship responsibilities."),
    technologies:stringArray.describe("Technologies used during the internship."),
    achievements:stringArray.describe("Notable achievements or outcomes during the internship."),
}).describe("A single internship entry.");

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

const awardItemSchema = z.object({
    title:       nullableString.describe("Name of the award."),
    issuer:      nullableString.describe("Organisation or person who granted this award."),
    date:        nullableString.describe("Date or year the award was received."),
    description: nullableString.describe("Brief description of why the award was given."),
}).describe("A single award entry.");

const publicationItemSchema = z.object({
    title:           nullableString.describe("Title of the published paper, article, or book."),
    publisher:       nullableString.describe("Publisher or journal name."),
    publicationDate: nullableString.describe("Date the work was published."),
    url:             nullableString.describe("URL or DOI link to the publication."),
    description:     nullableString.describe("Brief abstract or summary of the publication."),
}).describe("A single publication entry.");

const researchItemSchema = z.object({
    title:        nullableString.describe("Title of the research project or paper."),
    description:  nullableString.describe("Summary of the research topic and findings."),
    organization: nullableString.describe("Institution or organisation under which the research was conducted."),
    date:         nullableString.describe("Duration or date of the research."),
}).describe("A single research entry.");

const volunteerItemSchema = z.object({
    organization: nullableString.describe("Organisation where volunteering was done."),
    role:         nullableString.describe("Role or position held as a volunteer."),
    duration:     nullableString.describe("Duration or date range of volunteering."),
    description:  nullableString.describe("Description of contributions and activities."),
}).describe("A single volunteer experience entry.");

const leadershipItemSchema = z.object({
    organization: nullableString.describe("Organisation, club, or community where leadership was demonstrated."),
    role:         nullableString.describe("Leadership role or title (e.g. 'President', 'Tech Lead')."),
    description:  nullableString.describe("Description of leadership responsibilities and impact."),
}).describe("A single leadership experience entry.");

const languageItemSchema = z.object({
    language:    nullableString.describe("Human language spoken (e.g. 'English', 'Hindi')."),
    proficiency: nullableString.describe("Proficiency level (e.g. 'Native', 'Fluent', 'Intermediate', 'Basic')."),
}).describe("A single language proficiency entry.");

const referenceItemSchema = z.object({
    name:         nullableString.describe("Full name of the reference person."),
    designation:  nullableString.describe("Job title or designation of the reference person."),
    organization: nullableString.describe("Organisation where the reference person works."),
    email:        nullableString.describe("Email address of the reference person."),
    phone:        nullableString.describe("Phone number of the reference person."),
}).describe("A single professional reference entry.");

const patentItemSchema = z.object({
    title:  nullableString.describe("Title of the patent."),
    number: nullableString.describe("Patent registration number."),
    date:   nullableString.describe("Date the patent was granted or filed."),
}).describe("A single patent entry.");

const trainingItemSchema = z.object({
    title:        nullableString.describe("Title of the training programme."),
    organization: nullableString.describe("Organisation that delivered the training."),
    duration:     nullableString.describe("Duration or date range of the training."),
}).describe("A single training programme entry.");

const workshopItemSchema = z.object({
    title:        nullableString.describe("Title of the workshop or seminar."),
    organization: nullableString.describe("Organisation that conducted the workshop."),
    date:         nullableString.describe("Date or year of the workshop."),
}).describe("A single workshop entry.");

const conferenceItemSchema = z.object({
    title:        nullableString.describe("Name of the conference or event."),
    organization: nullableString.describe("Organising body of the conference."),
    date:         nullableString.describe("Date or year the conference took place."),
}).describe("A single conference participation entry.");

const socialProfileItemSchema = z.object({
    platform: nullableString.describe("Social platform name (e.g. 'Twitter', 'YouTube', 'Medium')."),
    url:      nullableString.describe("Full URL to the social profile."),
}).describe("A single additional social or online profile link.");

const customSectionItemSchema = z.object({
    title:   nullableString.describe("Title of this custom or non-standard resume section."),
    content: nullableString.describe("Full text content of the custom section."),
}).describe("A single entry for any non-standard resume section the candidate has added.");

// ─── Score breakdown schema (mirrors resumeATS.score.json weights) ─────────────

const scoreBreakdownSchema = z.object({
    totalScore: z.number().min(0).max(100).describe("The candidate's overall ATS score out of 100, computed by summing all section scores (0–100)."),
    sections: z.object({
        contactInformation: sectionScoreSchema({
            fullName:           z.number().min(0).max(2).describe("Award up to 2 points if a full name (first and last) is clearly present. 0 if missing or unclear."),
            professionalEmail:  z.number().min(0).max(2).describe("Award up to 2 points for a professional email (name@domain). Award fewer points for generic emails like 'test@...' or numbers-only addresses."),
            phoneNumber:        z.number().min(0).max(2).describe("Award up to 2 points for a valid phone number with country code if applicable. Award fewer points if only a partial number or unclear format."),
            linkedin:           z.number().min(0).max(2).describe("Award up to 2 points for a LinkedIn profile URL. Award fewer points if the URL is incomplete or broken."),
            githubOrPortfolio:  z.number().min(0).max(2).describe("Award up to 2 points for a GitHub profile or personal portfolio link. Award fewer points if only one is present or URL looks inactive."),
        }).describe("Contact Information section score (0–10). Award higher scores when the resume includes complete, professional contact details with multiple verified links."),

        resumeStructure: sectionScoreSchema({
            professionalSummary: z.number().min(0).max(2).describe("Award up to 2 points for a concise, role-specific professional summary that highlights key strengths. Award fewer points for generic or verbose summaries."),
            skillsSection:       z.number().min(0).max(2).describe("Award up to 2 points for the presence of a dedicated, well-organized skills section. Award fewer points if skills are scattered or poorly organized."),
            experienceSection:   z.number().min(0).max(3).describe("Award up to 3 points for a clearly labeled work experience section with proper chronological order. Award fewer points if missing or poorly structured."),
            projectsSection:     z.number().min(0).max(3).describe("Award up to 3 points for a dedicated projects section with multiple quality entries. Award fewer points if missing or minimal."),
            educationSection:    z.number().min(0).max(2).describe("Award up to 2 points for a clearly labeled education section with degree, institution, and graduation date. Award fewer points if incomplete."),
            clearSectionHeadings:z.number().min(0).max(2).describe("Award up to 2 points for using standard, ATS-readable section headings (e.g., 'Skills', 'Experience', 'Education'). Award fewer points if headings are vague or non-standard."),
            certificationsSection:z.number().min(0).max(1).describe("Award 1 point if a certifications or training section exists. 0 if missing."),
        }).describe("Resume Structure section score (0–15). Award higher scores when the resume contains all major sections in a logical order with clear headings."),

        atsFormatting: sectionScoreSchema({
            logicalOrganization:       z.number().min(0).max(4).describe("Award up to 4 points for a logical top-to-bottom resume flow with contact info first, followed by summary, skills, experience, education, and other sections. Award fewer points if the order is confusing."),
            clearSectionSeparation:    z.number().min(0).max(3).describe("Award up to 3 points for clear visual and textual separation between sections using line breaks or dividers (inferred from text structure only). Award fewer points if sections blend together."),
            atsFriendlyHeadings:       z.number().min(0).max(3).describe("Award up to 3 points for consistent use of standard ATS-friendly headings without special characters or formatting. Award fewer points if headings use unusual symbols or styling."),
            appropriateResumeLength:   z.number().min(0).max(2).describe("Award up to 2 points for keeping the resume within 1–2 pages of content. Award fewer points for excessive length (3+ pages) or extremely brief content."),
            professionalFormatting:    z.number().min(0).max(3).describe("Award up to 3 points for a clean, professional appearance using standard fonts and spacing. Note: Evaluate formatting only from extracted text; do not assume layout information beyond what is evident in the text."),
            consistentFormatting:      z.number().min(0).max(3).describe("Award up to 3 points for consistent fonts, spacing, and alignment throughout the resume. Award fewer points if formatting varies significantly between sections."),
            minimalDecorativeElements: z.number().min(0).max(2).describe("Award up to 2 points for minimal use of tables, graphics, images, or other ATS-breaking elements. Award fewer points if decorative elements are excessive."),
        }).describe("ATS Formatting section score (0–20). Evaluate formatting only from the extracted resume text. Award higher scores when formatting is clean, organized, and ATS-compatible."),

        skills: sectionScoreSchema({
            technicalSkills: z.number().min(0).max(5).describe("Award higher scores when the resume demonstrates a broad and relevant technical skill set (e.g., 'React, Node.js, Express.js, MongoDB, Docker, Redis, AWS' scores higher than just 'React'). Consider breadth, depth, relevance, and diversity."),
            skillOrganization:z.number().min(0).max(3).describe("Award up to 3 points for organizing skills into logical categories (e.g., 'Languages', 'Frameworks', 'Cloud Platforms', 'Tools'). Award fewer points if skills are listed randomly."),
            relevantSkills:  z.number().min(0).max(3).describe("Award up to 3 points when most listed skills are relevant to modern job descriptions and industry trends. Award fewer points for outdated or niche-only skills."),
            softSkills:      z.number().min(0).max(2).describe("Award up to 2 points for including soft skills (e.g., 'Communication', 'Leadership', 'Problem-solving'). Award fewer points if soft skills are absent or minimal."),
            duplicateFree:   z.number().min(0).max(2).describe("Award up to 2 points if skills are listed without significant duplication. Award fewer points for repeated skill entries."),
        }).describe("Skills section score (0–15). Award higher scores when the resume demonstrates a broad and relevant technical skill set, well-organized by category."),

        experience: sectionScoreSchema({
            jobTitle:             z.number().min(0).max(2).describe("Award up to 2 points if each role clearly states the job title. Award fewer points if titles are unclear or missing."),
            companyName:          z.number().min(0).max(2).describe("Award up to 2 points if each role clearly states the company name. Award fewer points if company names are missing or vague."),
            employmentDates:      z.number().min(0).max(2).describe("Award up to 2 points if each role includes start and end dates (or 'Currently working'). Award fewer points for incomplete or missing dates."),
            bulletPoints:         z.number().min(0).max(2).describe("Award up to 2 points for using bullet points instead of long paragraphs for job descriptions. Award fewer points if descriptions are in paragraph form."),
            actionVerbs:          z.number().min(0).max(3).describe("Award up to 3 points for consistently starting bullet points with strong action verbs (e.g., 'Developed', 'Implemented', 'Led'). Award fewer points for weak verbs or passive voice."),
            quantifiedAchievements:z.number().min(0).max(4).describe("Award higher scores for bullet points that include quantified, data-backed achievements with measurable impact (e.g., 'Reduced load time by 40%', 'Increased user engagement by 25%'). Award fewer points for generic descriptions without metrics."),
        }).describe("Experience section score (0–15). Award higher scores for resumes with clear job titles, company names, dates, action verbs, and especially quantified achievements with measurable impact."),

        projects: sectionScoreSchema({
            projectTitle:      z.number().min(0).max(2).describe("Award up to 2 points for each project having a clear, descriptive title. Award fewer points for unclear or missing titles."),
            projectDescription:z.number().min(0).max(3).describe("Award up to 3 points for clear, high-quality descriptions explaining what the project does and the problem it solves. Award fewer points for vague or incomplete descriptions."),
            technologyStack:   z.number().min(0).max(3).describe("Award up to 3 points for explicitly listing the technology stack, frameworks, and libraries used in the project. Award fewer points if technologies are missing or unclear."),
            githubLink:        z.number().min(0).max(2).describe("Award up to 2 points if a GitHub repository link is included. Award fewer points if the link is missing or inactive."),
            liveDemo:          z.number().min(0).max(2).describe("Award up to 2 points if a live demo or deployed project link is included. Award fewer points if missing."),
            projectImpact:     z.number().min(0).max(3).describe("Award up to 3 points for describing measurable project impact, key achievements, or lessons learned. Award fewer points for generic or vague outcomes."),
        }).describe("Projects section score (0–15). Award higher scores based on description quality, technology clarity, and availability of GitHub or live demo links."),

        education: sectionScoreSchema({
            degree:          z.number().min(0).max(2).describe("Award up to 2 points for clearly listing the degree or qualification (e.g., 'B.Tech', 'M.Sc', '12th Standard'). Award fewer points if missing or unclear."),
            institution:     z.number().min(0).max(1).describe("Award 1 point for naming the institution. 0 if missing."),
            graduationYear:  z.number().min(0).max(1).describe("Award 1 point for including the graduation or expected graduation year. 0 if missing."),
            cgpaOrPercentage:z.number().min(0).max(1).describe("Award 1 point if CGPA or percentage score is included. 0 if missing."),
        }).describe("Education section score (0–5). Award higher scores for complete education information including degree, institution, year, and academic performance metrics."),

        grammarAndReadability: sectionScoreSchema({
            grammar:             z.number().min(0).max(2).describe("Award up to 2 points for correct grammar throughout the resume. Award fewer points for grammatical errors or awkward phrasing."),
            spelling:            z.number().min(0).max(1).describe("Award 1 point for correct spelling throughout. 0 if spelling errors are present."),
            professionalLanguage:z.number().min(0).max(1).describe("Award 1 point for consistent use of professional, formal language. 0 if tone is casual or unprofessional."),
            readability:         z.number().min(0).max(1).describe("Award 1 point for overall readability and conciseness. 0 if content is verbose, hard to follow, or poorly organized."),
        }).describe("Grammar & Readability section score (0–5). Award higher scores for professional language, good grammar, concise writing, consistent tone, and easy readability."),
    }).describe("Section-by-section ATS score breakdown."),
}).describe("Full ATS score breakdown mirroring the resumeATS.score.json weight system. totalScore is the sum of all section scores (0–100).");

// ─── Feedback & improvement suggestions ──────────────────────────────────────

const improvementSuggestionSchema = z.object({
    section:    z.string().describe("The resume section this suggestion applies to (e.g. 'Contact Information', 'Projects', 'Skills')."),
    issue:      z.string().describe("A clear description of the problem or gap identified in this section."),
    suggestion: z.string().describe("A specific, actionable recommendation to improve the section and raise the ATS score."),
    impact:     z.enum(["low", "medium", "high"]).describe("Expected impact of applying this suggestion on the overall ATS score: low, medium, or high."),
}).describe("A single actionable improvement suggestion.");

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
    contact: contactSchema,

    professionalSummary: nullableString
        .describe("The professional summary or profile statement from the resume, verbatim or lightly normalised."),

    objective: nullableString
        .describe("The career objective statement from the resume, if separate from the professional summary."),

    skills:       skillsSchema,
    experience:   z.array(experienceItemSchema).describe("All work experience entries extracted from the resume, ordered most-recent first."),
    internships:  z.array(internshipItemSchema).describe("All internship entries extracted from the resume."),
    projects:     z.array(projectItemSchema).describe("All personal, academic, or professional project entries extracted from the resume."),
    education:    z.array(educationItemSchema).describe("All education entries extracted from the resume, ordered most-recent first."),
    certifications:       z.array(certificationItemSchema).describe("All certifications and online course completions."),
    achievements:         z.array(achievementItemSchema).describe("All standalone achievement or accomplishment entries."),
    awards:               z.array(awardItemSchema).describe("All award entries listed on the resume."),
    publications:         z.array(publicationItemSchema).describe("All published works: papers, articles, blogs, or books."),
    research:             z.array(researchItemSchema).describe("All research project entries."),
    volunteerExperience:  z.array(volunteerItemSchema).describe("All volunteer or community service entries."),
    leadership:           z.array(leadershipItemSchema).describe("All leadership or club/society role entries."),
    extracurricularActivities: z.array(z.object({
        title:       nullableString.describe("Title of the extracurricular activity."),
        description: nullableString.describe("Brief description of the activity and the candidate's involvement."),
    })).describe("Extracurricular activities listed on the resume."),
    languages:   z.array(languageItemSchema).describe("Human languages and proficiency levels listed."),
    interests:   stringArray.describe("Personal interests or hobbies listed as a short array of strings."),
    hobbies:     stringArray.describe("Hobbies listed explicitly on the resume."),
    references:  z.array(referenceItemSchema).describe("Professional references listed on the resume."),
    patents:     z.array(patentItemSchema).describe("Patents filed or granted."),
    training:    z.array(trainingItemSchema).describe("Formal training programmes attended."),
    workshops:   z.array(workshopItemSchema).describe("Workshops or seminars attended."),
    conferences: z.array(conferenceItemSchema).describe("Conferences or events attended or presented at."),
    socialProfiles: z.array(socialProfileItemSchema).describe("Additional social or online profiles beyond those in the contact section."),
    customSections: z.array(customSectionItemSchema).describe("Any non-standard or custom sections the candidate added to their resume."),
    other: z.object({
        additionalInformation: nullableString.describe("Miscellaneous information that does not fit any other section."),
        notes:                 nullableString.describe("Internal parser notes about ambiguous or unclear resume content."),
    }).describe("A catch-all section for any additional or unclassified resume content."),

    // ── ATS score breakdown ───────────────────────────────────────────────────
    scoreBreakdown: scoreBreakdownSchema,

    // ── Qualitative feedback ──────────────────────────────────────────────────
    strengths: z.array(strengthSchema)
        .describe("A list of specific strengths and positive observations about the resume."),

    improvements: z.array(improvementSuggestionSchema)
        .describe("A prioritised list of actionable improvement suggestions to increase the ATS score."),

    overallFeedback: z.string().nullable()
        .describe("A concise overall summary of the resume quality, ATS readiness, and top 2–3 priorities for improvement. Null when success is false."),

});

export default resumeATSReportSchema;

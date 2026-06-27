import mongoose from "mongoose"


const scoreBreakdownSchema = new mongoose.Schema({
    sections : {
        atsFormatting
        contactInformation
        education
        experience
        grammarAndReadability
        projects
        resumeStructure
        skills
    },
    totalScore:{
        type : Number,
        required : [true," Total Score is required "],
        min : 0,
        max : 100
    },
})

const feedbackSchema = new mongoose.Schema({
    improvements : {
        type : Array,
        required : [true," Suggestions are required "],
        default : []
    },
    overallFeedback : {
        type : String,
        required : [true,"feedback is required"]
    },
    strengths:{

    }
})

const resumeReportSchema = new mongoose.Schema({
    feedback : feedbackSchema,
    scoreBreakdown: scoreBreakdownSchema
})




const resumeSchema  = new mongoose.Schema({
    success:{
        type : Boolean,
        required : [true," Success is required "],
    },
    message:{
        type : String,
        // required : [true," Message is required "],
    },
    report: resumeReportSchema,
    resume :
})
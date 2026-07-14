import mongoose from "mongoose"


const scoreBreakdownSchema = new mongoose.Schema({
    sections : {
        atsFormatting : {
            type : Number,
            required : [true," ATS Formatting Score is required "],
        },
        contactInformation : {
            type : Number,
            required : [true," Contact Information Score is required "],
        },
        education : {
            type : Number,
            required : [true," Education Score is required "],
        },
        experience : {
            type : Number,
            required : [true," Experience Score is required "],
        },
        grammarAndReadability : {
            type : Number,
            required : [true," Grammar and Readability Score is required "],
        },
        projects : {
            type : Number,
            required : [true," Projects Score is required "],
        },
        resumeStructure : {
            type : Number,
            required : [true," Resume Structure Score is required "],
        },
        skills : {
            type : Number,
            required : [true," Skills Score is required "],
        }

    },
    totalScore:{
        type : Number,
        required : [true," Total Score is required "],
        min : 0,
        max : 100
    },
},{_id : false})

const improvementSchema = new mongoose.Schema({
    section : {
        type : String,
        required : [true,"Section is required"]
    },
    impact : {
        type : String,
        required : [true,"Impact is required"]
    },
    issue : {
        type : String,
        required : [true,"Issue is required"]
    },
    suggestion : {
        type : String,
        required : [true,"Suggestion is required"]
    }
},{_id : false})

const strengthSchema = new mongoose.Schema({
    section : {
        type : String,
        required : [true,"Section is required"]
    },
    observation : {
        type : String,
        required : [true,"Observation is required"]
    }
},{_id : false })

const feedbackSchema = new mongoose.Schema({
    improvements : {
        type: [improvementSchema],
        default: []
    },
    overallFeedback : {
        type : String,
        required : [true,"feedback is required"]
    },
    strengths:{
        type : [strengthSchema],
        default : []
    }
},{_id : false})

const reportSchema = new mongoose.Schema({
    feedback : feedbackSchema,
    scoreBreakdown: scoreBreakdownSchema
},{_id : false})



const resumeReportSchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    success:{
        type : Boolean,
        required : [true," Success is required "],
    },
    message:{
        type : String,
        // required : [true," Message is required "],
    },
    report: reportSchema,
    resume : {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
},{timestamps : true})

resumeReportSchema.index({ userId: 1 });

const ResumeReport = mongoose.model("ResumeReport",resumeReportSchema)

export default ResumeReport
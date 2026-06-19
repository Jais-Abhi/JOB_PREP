import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Question is required"]
    },
    intension : {
        type : String,
        required : [true, "Intension is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    },
},{
    _id : false
})


const behaviourQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Question is required"]
    },
    intension : {
        type : String,
        required : [true, "Intension is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    },
},{
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ['low', 'medium', 'high']
    },
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type : Number,
        required : [true, "Day is required"]
    },
    focusArea : {
        type : String,
        required : [true, "Focus area is required"]
    },
    tasks : {
        type : [String],
        required : [true, "Tasks are required"]
    },
},{
    _id : false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job description is required"]
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    title:{
        type : String,
        required : [true, "Title is required"]
    },
    matchScore : {
        type : Number,
        required : [true, "Match score is required"],
        min : [0, "Match score must be at least 0"],
        max : [100, "Match score cannot exceed 100"]
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviourQuestions: [behaviourQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlans: [preparationPlanSchema],
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

export default InterviewReport;
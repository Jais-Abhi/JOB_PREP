import express from "express";
import {generateResumeScoreController ,getReportController} from "../Controllers/resume.controller.js";
import isAuth from "../Middleware/auth.middleware.js";
import upload from "../Middleware/fileUpload.middleware.js";
const resumeRouter = express.Router();

/**
 * @route POST api/resume/ats-check
 * @desc Generate Resume ATS Score Report
 * @access private
 */

resumeRouter.post("/ats-check",isAuth,upload.single("resume"), generateResumeScoreController)
resumeRouter.get("/report/:_id",isAuth,getReportController )
export default resumeRouter;
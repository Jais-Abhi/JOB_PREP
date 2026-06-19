import express from "express"
import isAuth from "../Middleware/auth.middleware.js";
import {generateReportController} from "../Controllers/interview.controller.js"

const interviewRouter = express.Router();

/**
 * @route POST api/interview/generate-report
 * @desc Generate Interview Report
 * @access Private
 */
interviewRouter.post("/generate-report",isAuth, generateReportController);

export default interviewRouter;
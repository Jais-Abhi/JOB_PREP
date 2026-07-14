import express from "express"
import isAuth from "../Middleware/auth.middleware.js";
import {generateReportController ,getReportController} from "../Controllers/interview.controller.js"
import upload from "../Middleware/fileUpload.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST api/interview/generate-report
 * @desc Generate Interview Report
 * @access Private
 */
interviewRouter.post("/generate-report",isAuth,upload.single("resume"), generateReportController);
interviewRouter.get("/report/:_id",isAuth, getReportController);

export default interviewRouter;
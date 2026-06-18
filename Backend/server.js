import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToDB from "./Config/db.js";
import authRouter from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}))
const PORT = process.env.PORT || 5000;

connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use("/api/v1/user/auth", authRouter);
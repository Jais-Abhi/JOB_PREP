import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToDB from "./Config/db";
import authRouter from "./Routes/auth.Route";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use("/api/v1/user/auth", authRouter);
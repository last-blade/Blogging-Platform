import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config({
    path: "./.env",
});

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(cookieParser());
app.use(express.static("public"));


//importing routes
import userRouter from "./routes/user.routes.js"


//Routes
app.use("/api/v1/user", userRouter);

export { app }
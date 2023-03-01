import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connection.js";
import { authRouter, commentRouter, postRouter, userRouter } from "./src/modules/index.router.js";
dotenv.config({ path: "./config/.env" });
const app = express();
const port = 3000;
app.use(express.json());
connectDB();
const BASEURL=process.env.BASEURL
app.use(`${BASEURL}/auth` ,authRouter)
app.use(`${BASEURL}/user`, userRouter);
app.use(`${BASEURL}/post`, postRouter);
app.use(`${BASEURL}/comment`, commentRouter);



app.use("*", (req, res) => {
  res.status(404).json({ message: "page is not found" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

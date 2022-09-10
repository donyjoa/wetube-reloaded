import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

// 포트번호
const PORT = 4000;

// 호출
const app = express();
const logger = morgan("dev");

// middlewere
app.use(logger);

// use router
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// 연결
const handleListenging = () => {
  console.log(`server on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListenging);

// #4.8 부터

import express from "express";
import morgan from "morgan";

// 포트번호
const PORT = 4000;

// express 호출
const app = express();
const logger = morgan("dev");

// middlewere
app.use(logger);

// router start

// global
const globalRouter = express.Router();

// funtion
const handleHome = (req, res) => {
  res.send("home");
};

// get
globalRouter.get("/", handleHome);

//
// user
const userRouter = express.Router();

// funtion
const handleEditUser = (req, res) => {
  res.send("user");
};

// get
userRouter.get("/edit", handleEditUser);

//
// video
const videoRouter = express.Router();

// funtion
const handleWatchVideo = (req, res) => {
  res.send("video");
};

// get
videoRouter.get("/watch", handleWatchVideo);

// router end

// use router
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// 연결
const handleListenging = () => {
  console.log(`server on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListenging);

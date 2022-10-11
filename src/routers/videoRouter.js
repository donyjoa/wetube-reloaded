import express from "express";
import {
  edit,
  upload,
  deleteVideo,
  watch,
} from "../controllers/videoController";

const videoRouter = express.Router();

// router
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;

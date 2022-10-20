import express from "express";
import {
  upload,
  deleteVideo,
  watch,
  getEdit,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

// router
// watch
videoRouter.get("/:id(\\d+)", watch);

// edit
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

/* 구버전
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);
*/

export default videoRouter;

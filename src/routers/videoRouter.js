import express from "express";
import {
  upload,
  deleteVideo,
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

// router
// watch
videoRouter.get("/:id([0-9a-f]{24})", watch);

// edit
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

// delete
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

// upload
videoRouter.route("/upload").get(getUpload).post(postUpload);

/* 구버전
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);
*/

export default videoRouter;

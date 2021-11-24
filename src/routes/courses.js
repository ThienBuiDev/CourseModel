import express from "express";
const router = express.Router();

import CourseController from "../app/controllers/CourseController.js";

router.get("/create", CourseController.create);
router.post("/store", CourseController.store);
router.get("/:id/edit", CourseController.edit);
router.put("/:id", CourseController.update);
router.get("/:slug", CourseController.show);
router.delete("/:id", CourseController.destroy);
export default router;
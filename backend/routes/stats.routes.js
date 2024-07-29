import express from "express";
import {
  createStat,
  updateStat,
  deleteStat,
  viewStat,
} from "../controllers/stats.controller.js";

const router = express.Router();

router.post("/", createStat);
router.get("/", viewStat);
router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

export default router;

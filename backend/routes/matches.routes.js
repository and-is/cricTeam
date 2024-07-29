import express from "express";
import {
  createMatch,
  updateMatch,
  deleteMatch,
  viewMatch,
} from "../controllers/matches.controller.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", viewMatch);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;

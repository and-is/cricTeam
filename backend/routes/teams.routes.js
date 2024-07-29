import express from "express";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  viewTeam,
} from "../controllers/teams.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/", viewTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;

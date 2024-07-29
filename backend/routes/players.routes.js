import express from "express";
import {
  createPlayer,
  updatePlayer,
  deletePlayer,
  viewPlayer,
} from "../controllers/players.controller.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", viewPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;

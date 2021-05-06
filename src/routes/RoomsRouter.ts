import express from "express";
const router = express.Router();
import RoomsController from "../controllers/RoomsController";
const controller = new RoomsController();

const baseUrl = "/rooms"

router.get(baseUrl, (req, res) => controller.list(req, res));
router.post(baseUrl, (req, res) => controller.create(req, res));

export default router;
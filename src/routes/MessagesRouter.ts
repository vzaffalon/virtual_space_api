import express from "express";
import MessagesController from "../controllers/MessagesController";
const router = express.Router();
const controller = new MessagesController();

const baseUrl = "/messages"

router.get(baseUrl, (req, res) => controller.list(req, res));
router.post(baseUrl, (req, res) => controller.create(req, res));

export default router;
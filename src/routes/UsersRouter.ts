import express from "express";
const router = express.Router();
import UsersController from "../controllers/UsersController";
const controller = new UsersController();

const baseUrl = "/users"

router.get(baseUrl, (req, res) => controller.list(req, res));
router.patch(baseUrl, (req, res) => controller.create(req, res));
router.post(baseUrl, (req, res) => controller.create(req, res));

export default router;
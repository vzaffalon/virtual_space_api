import express from "express";
const router = express.Router();
import UsersController from "../controllers/UsersController";
const controller = new UsersController();

const baseUrl = "/users"

router.get(baseUrl, (req, res) => controller.list(req, res));
router.patch(baseUrl + "/:id", (req, res) => controller.update(req, res));
router.delete(baseUrl + "/:id", (req, res) => controller.delete(req, res));
router.post(baseUrl, (req, res) => controller.create(req, res));

export default router;
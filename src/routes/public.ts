import express from "express";
import * as publicController from "../controllers/public-controller";
const router = express.Router();

router.get("/", publicController.getHome);
router.get("/health", publicController.getHealth);
router.get("/ping", publicController.getPing);

export default router;

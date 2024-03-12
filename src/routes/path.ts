import express from "express";
import pathController from "../controllers/path";

const pathRouter = express.Router();

pathRouter.get("/path", pathController.getPath);

export default pathRouter;

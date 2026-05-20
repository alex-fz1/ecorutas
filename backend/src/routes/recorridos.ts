import { Router } from "express";
import { getAll, getById } from "../controllers/recorridosController";

export const recorridosRouter = Router();

recorridosRouter.get("/",    getAll);
recorridosRouter.get("/:id", getById);
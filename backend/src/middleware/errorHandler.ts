import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("[EcoRutas API Error]", err.message);
  res.status(500).json({ message: "Error interno del servidor", detail: err.message });
}
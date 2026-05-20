import express from "express";
import cors    from "cors";
import dotenv  from "dotenv";
import { recorridosRouter } from "./routes/recorridos";
import { especiesRouter   } from "./routes/especies";
import { descargasRouter  } from "./routes/descargas";
import { errorHandler     } from "./middleware/errorHandler";

dotenv.config();

const app  = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.use("/api/recorridos", recorridosRouter);
app.use("/api/especies",   especiesRouter);
app.use("/api/descargas",  descargasRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`🌿 EcoRutas API corriendo en http://localhost:${PORT}`)
);
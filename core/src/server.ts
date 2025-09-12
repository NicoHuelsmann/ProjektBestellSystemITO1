import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 9000;

// CORS aktivieren (alles zulassen)
app.use(cors());

// Middleware für JSON
app.use(express.json());

// GET /health
app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true });
});
// POST /echo
app.post("/echo", (req: Request, res: Response) => {
    res.json({ youSent: req.body });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

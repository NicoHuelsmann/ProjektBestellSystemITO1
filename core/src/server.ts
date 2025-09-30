import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Health
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// Echo
app.post("/echo", (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

// Login
app.get("/Login", (req: Request, res: Response) => {   
    console.log ('test');
  const db = new sqlite3.Database("core/Database/datenbank.db", (err) => {
    if (err) {
      console.error("Fehler beim Öffnen der Datenbank:", err.message);
      res.status(500).json({ error: err.message });
      return;
    }
  });

  db.run('INSERT INTO tsta (STTXT) VALUES (?)', ["test"], (err) => {
    if (err) {
      console.error("Fehler beim Insert:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
    db.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
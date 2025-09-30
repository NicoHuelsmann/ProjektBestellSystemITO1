import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";

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
app.post("/login", (req: Request, res: Response) => {

    const db = new sqlite3.Database('/home/nico/Dokumente/ProjektBestellSystemITO1/core/database/datenbank.db', (err) => {
      if (err) {
        console.error("Fehler beim Öffnen der Datenbank:", err.message);
        res.status(500).json({ error: err.message });
        return;
      }
    });
    
    db.get(
      'SELECT 1 FROM USR01 WHERE USRNAM = ? AND PWCODE = ?',
      [req.body.username, req.body.password],
      (err, row) => {
        if (err) {
          console.error("Fehler beim SELECT:", err.message);
          res.status(500).json({ error: err.message });
        } else if (row) {
          res.json({ success: true, row });
        } else {
          res.json({ success: false, message: "Kein Benutzer gefunden" });
        }
        db.close();
      }
    );
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
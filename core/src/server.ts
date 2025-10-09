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
app.get("/users", (req: Request, res: Response) => {
  const db = new sqlite3.Database(
    'C:\\Users\\nicoh\\Documents\\GitHub\\ProjektBestellSystemITO1\\core\\database\\datenbank.db',
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
    }
  );

  db.all('SELECT * FROM USR01', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, users: rows });
    }
    db.close();
  });
});


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
import express, { Request, response, Response } from "express";
import cors from "cors";
import sqlite3, { Database } from "sqlite3";
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
    '/home/nico/Dokumente/ProjektBestellSystemITO1/core/database/datenbank.db',
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
    }
  );
  (async () => {
    try {
      const user = await fetchAll(db, `SELECT * FROM USR01`, []);
      console.log(user);
      res.json(user);
    } catch (err) {
      console.log(err);
    } finally {
      db.close();
    }
  })();

});

// Role
app.post("/role", (req: Request, res: Response) => {
  const db = new sqlite3.Database(
    '/home/nico/Dokumente/ProjektBestellSystemITO1/core/database/datenbank.db',
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
    }
  );

  (async () => {
    const db = new sqlite3.Database("/home/nico/Dokumente/ProjektBestellSystemITO1/core/database/datenbank.db");
  
    try {
      console.log (req.query.persnr);
      const user = await fetchFirst(db, `SELECT USR01.ROLEID FROM USR01 WHERE USR01.PERSNR=?`, [req.query.persnr as string]);
      res.json(user);
    } catch (err) {
      console.log(err);
    } finally {
      db.close();
    }
  })();
});

// Artikel
app.get("/")

export const fetchAll = async (db: Database, sql: string, params: Array<string>) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const fetchFirst = async (db: Database, sql: string, params: Array<string>) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};



app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
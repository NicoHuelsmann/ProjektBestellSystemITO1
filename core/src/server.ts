import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3, { Database } from "sqlite3";

const app = express();
const PORT = process.env.PORT || 9000;
const dbpath = './database/datenbank.db';

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
app.post("/users", (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbpath,
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
      const user: any = await fetchFirst(db, `SELECT USR01.PERSNR, USR01.PWCODE FROM USR01 WHERE USR01.UNAME=?`, [req.query.usrnam as string]);
      res.json({userID: user.PERSNR, password: user.PWCODE});
    } catch (err) {
      console.log(err);
    } finally {
      db.close();
    }
  })();

});

// Role
app.post("/role", (req: Request, res: Response) => {
    const db = new sqlite3.Database(dbpath,
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
    });

  (async () => {
    try {
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
app.get("/artikel", (req: Request, res: Response) => {
    const db = new sqlite3.Database(dbpath,
    (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
    });

    (async () => {
        try {
                        const artikel: any = await fetchAll(db, `Select a.ARTNR, a.KTEXT, p.PRWRT 
                                                    from preis p
                                                    join artikel a on a.ARTNR = p.ARTNR
                                                    where p.PRDAT = 
	                                                  (select max(p2.prdat) from preis p2 where p2.ARTNR = a.ARTNR);`, []);
            const data: any[] = [];
            for (let i = 0; i < artikel.length; i++){
                data.push({
                    artikelnummer: artikel[i].ARTNR,
                    beschreibung: artikel[i].KTEXT,
                    preis: artikel[i].PRWRT
                });
            }
            res.json(data);
        } catch (err) {
            console.log(err);
        } finally {
            db.close();
        }
    })();
});

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
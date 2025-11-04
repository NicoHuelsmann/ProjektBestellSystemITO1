import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3, { Database } from "sqlite3";
import userEndpoint from "./endPoints/userEndpoint";
import RoleEndpoint from "./endPoints/RoleEndpoints";
import { ArtikelEndpoint, ArtikelInsertEndpoint} from "./endPoints/ArtikelEndpoints";
import { TischeSetEndpoint, TischeEndpoint } from "./endPoints/TischeEndpoints";

const app = express();
const PORT = 9000;
const dbpath = './database/datenbank.db';
//const HOST = '10.160.8.121'
const HOST = 'localhost';
app.use(cors());
app.use(express.json());

// HealthGET
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// EchoPOST
app.post("/echo", (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

// usersPOST
app.post("/users", (req: Request, res: Response) => {
    (async () => {
        res.json(await userEndpoint(dbpath,req.body.usrnam))
    })()
});

// RolePOST
app.post("/getRole", (req: Request, res: Response) => {
    (async () => {
        res.json(await RoleEndpoint(dbpath, req.body.persnr))
    })()
});

// ArtikelGET
app.get("/getArtikel", (req: Request, res: Response) => {
    (async () => {
        res.json(await ArtikelEndpoint(dbpath))
    })()
});

// ArtikelInsertPOST
app.post("/setArtikel", (req: Request, res: Response) => {
    (async () => {
        res.json(await ArtikelInsertEndpoint(dbpath, req.body.bezeichnung, req.body.preis))
    })()
});

// TischeSetGET
app.get("/setTische", (req: Request, res: Response) => {
    (async () => {
        res.json(await TischeSetEndpoint(dbpath))
    })()
});

// TischeGetGET
app.get("/getTische", (req: Request, res: Response) => {
    (async () => {
        res.json(await TischeEndpoint(dbpath))
    })()
});
/**
 * Es werden die bestellungen über alle Geräte sycronisiert
 */
const currentBestellungenSync:{ orderId:any, data:{} }[] = []
app.post('/setCurrentOrder', (req: Request, res: Response) =>{
    currentBestellungenSync.push(req.body)
});

app.post('/getCurrentOrder', (req: Request, res: Response) =>{
    if(currentBestellungenSync.filter((d) => d.orderId === req.body.orderId) !== undefined){
        const result = currentBestellungenSync.filter((d) => d.orderId === req.body.orderId)
        if(result[0] !== undefined) res.json(result[0].data)
    }
    res.send(undefined)
});

app.post("/removeCurrentOrder", (req: Request, res: Response) => {
    const orderId = req.body.orderId;
    const lengthBefore = currentBestellungenSync.length;
    const filtered = currentBestellungenSync.filter((d) => d.orderId !== orderId);

    if (filtered.length === lengthBefore) {
        return res.status(404).json({ error: "Order not found" });
    }
    currentBestellungenSync.length = 0; // Array leeren
    currentBestellungenSync.push(...filtered); // gefilterte Items wieder einfügen

    res.json({ message: "Order removed", currentBestellungenSync });
});
app.get("/getAllCurrentOrder", (req: Request, res: Response) => {
    res.json({data:currentBestellungenSync})
})

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

app.listen(PORT,HOST, () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});
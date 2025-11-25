import cors from "cors";
import express, { Request, Response } from "express";
import { Database } from "sqlite3";
import { ArtikelEndpoint, ArtikelInsertEndpoint } from "./endPoints/ArtikelEndpoints";
import RoleEndpoint from "./endPoints/RoleEndpoints";
import { TischeEndpoint, TischeInsertEndpoint, TischeRemoveEndpoint } from "./endPoints/TischeEndpoints";
import { userEndpointGetPersnrByUname, userEndpointGetUserByUserID } from "./endPoints/userEndpoint";

const app = express();
const PORT = 9000;
const dbpath = './database/datenbank.db';
const HOST = '192.168.178.194'
//const HOST = 'localhost';
app.use(cors());
app.use(express.json());


function createEndpoint<T extends (body?: any) => Promise<any>>(endpointFunction: T) {
    return async (req: Request, res: Response) => {
        try {
            // Prüfen, ob die Funktion Parameter erwartet
            const expectsBody = endpointFunction.length > 0;

            if (expectsBody && !req.body) {
                res.status(400).json({ error: "body is required" });
                return;
            }

            // Wenn die Funktion Parameter erwartet, Body übergeben – sonst nicht
            const result = expectsBody
                ? await endpointFunction(req.body)
                : await endpointFunction();

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "internal server error" });
        }
    };
}

// HealthGET
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// EchoPOST
app.post("/echo", (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

// UserPOST
app.post("/getUser", createEndpoint(async (body) => {
    return await userEndpointGetPersnrByUname(dbpath, body.usrnam);
}));

// UserNamesPOST
app.post("/getUserNames", createEndpoint(async (body) => {
    return await userEndpointGetUserByUserID(dbpath, body.persnr);
}));

// RolePOST
app.post("/getRole", createEndpoint(async (body) => {
    return await RoleEndpoint(dbpath, body.persnr);
}));

// ArtikelGET
app.get("/getArtikel", createEndpoint(async () => {
    return await ArtikelEndpoint(dbpath);
}));

// ArtikelInsertPOST
app.post("/insertArtikel", createEndpoint(async (body) => {
    return await ArtikelInsertEndpoint(dbpath, body.bezeichnung, body.preis);
}));

// TischeSetGET
app.get("/insertTische", createEndpoint(async () => {
    return await TischeInsertEndpoint(dbpath);
}));

// TischeGetGET
app.get("/getTische", createEndpoint(async () => {
    return await TischeEndpoint(dbpath);
}));

// TischeDelPOST
app.post("/delTisch", createEndpoint(async (body) => {
    return await TischeRemoveEndpoint(dbpath, body.TischID);
}));

/**
 * Es werden die bestellungen über alle Geräte sycronisiert
 */
const currentBestellungenSync:{ orderId:any, data:{}, date:string }[] = []
app.post('/setCurrentOrder', (req: Request, res: Response) =>{
    currentBestellungenSync.push(req.body)
    console.log(currentBestellungenSync)
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

export const fetchAll = async (db: Database, sql: string, params: Array<any>) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const fetchFirst = async (db: Database, sql: string, params: Array<any>) => {
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
import sqlite3 from "sqlite3";
import { fetchAll } from "../server";

export async function ArtikelEndpoint(dbpath:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return err;
            }
        }
    );
    try {
        const artikel: any = await fetchAll(db, `Select a.ARTNR, a.TEXT, p.PRWRT 
                                    from preis p
                                    join artikel a on a.ARTNR = p.ARTNR
                                    where p.PRDAT = 
                                    (select max(p2.prdat) from preis p2 where p2.ARTNR = a.ARTNR);`, []);
        const data: any[] = [];
        for (let i = 0; i < artikel.length; i++){
            data.push({
                artikelnummer: artikel[i].ARTNR,
                beschreibung: artikel[i].TEXT,
                preis: artikel[i].PRWRT
            });
        }
        return data;
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null
}

function runAsync(db: sqlite3.Database, sql: string, params: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (this: sqlite3.RunResult, err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

export async function ArtikelInsertEndpoint(dbpath: string, ArtikelBeschreibung: string, ArtikelPreis: number) {
    const db = new sqlite3.Database(dbpath, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
    try {
        const lastID = await runAsync(db, 
            `INSERT INTO ARTIKEL (KTEXT) VALUES (?)`, 
            [ArtikelBeschreibung]
        );
        await runAsync(db, 
            `INSERT INTO PREIS (ARTNR, PRWRT, PRDAT) VALUES (?, ?, DATE('now'))`, 
            [lastID, ArtikelPreis]
        );
        return {artikelnummer: lastID };
    } catch (err) {
        console.log(err);
        return { ok: false, error: err };
    } finally {
        db.close();
    }
}
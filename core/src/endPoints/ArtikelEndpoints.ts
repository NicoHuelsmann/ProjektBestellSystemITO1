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

        const artikel: any = await fetchAll(db, `Select 
                                            a.ARTNR, a.TEXT, p.PRWRT, k.KATEXT, k.PARENTID 
                                        from artikel a
                                        left join preis p on a.ARTNR = p.ARTNR
                                        join kateg k on k.KATID = a.KATID
                                        where
                                            p.PRDAT IS NULL 
                                            OR p.PRDAT = 
                                            (select max(p2.prdat) from preis p2 where p2.ARTNR = a.ARTNR);`, []);
        artikel.forEach((a: any) => {
            a.KAT = [];
        });
        for (let i = 0; i < artikel.length; i++){
            let PARENTID = artikel[i].PARENTID;
            while (PARENTID !== null) {
                const parentKategorie: any = await fetchAll(db, `Select KATEXT, PARENTID from kateg where KATID = ?`, [PARENTID]);
                if (parentKategorie.length > 0) {
                    artikel[i].KAT[artikel[i].KAT.length] = parentKategorie[0].KATEXT;
                }
                PARENTID = parentKategorie.length > 0 ? parentKategorie[0].PARENTID : null;
                artikel[i].PARENT = parentKategorie.length > 0 ? parentKategorie[0].KATEXT : null;
            }
            if (artikel[i].PARENT == null) {
                artikel[i].PARENT = artikel[i].KATEXT;
            }
        }
        const data: any[] = [];
        for (let i = 0; i < artikel.length; i++){
            data.push({
                artikelnummer: artikel[i].ARTNR,
                parentID: artikel[i].PARENTID,
                beschreibung: artikel[i].TEXT,
                preis: artikel[i].PRWRT,
                kategorie: artikel[i].KATEXT,
                kategorieListe: artikel[i].KAT.reverse()
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

export async function ArtikelInsertEndpoint(dbpath: string, ArtikelBeschreibung: string, ArtikelPreis: number, ArtikelKategorieID: number) {
    const db = new sqlite3.Database(dbpath, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    });
    try {
        const lastID = await runAsync(db, 
            `INSERT INTO ARTIKEL (TEXT, KATID) VALUES (?, ?)`,
            [ArtikelBeschreibung, ArtikelKategorieID]
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
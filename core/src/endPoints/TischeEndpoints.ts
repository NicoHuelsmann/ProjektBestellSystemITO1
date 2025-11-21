import sqlite3 from "sqlite3";
import { fetchAll, fetchFirst } from "../server";

export async function TischeEndpoint(dbpath:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return err;
            }
        }
    );
    try {
        const result: any = await fetchAll(db, `SELECT TISCHID FROM TISCHE`, []);
        return ({Tische : result });
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null
}

export async function TischeInsertEndpoint(dbpath:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        }
    );
    try {
        const result: any = await fetchFirst(db, `SELECT COALESCE(
                                    (SELECT MIN(t1.TISCHID) + 1
                                    FROM TISCHE t1
                                    WHERE NOT EXISTS (SELECT 1 FROM TISCHE t2 WHERE t2.TISCHID = t1.TISCHID + 1)
                                        ), 1
                                    ) AS nextId`, []);
        await fetchAll(db, `INSERT INTO TISCHE (TISCHID) VALUES (?)`, [result.nextId]);
        return ({ ok : true, TischNr : result.nextId });
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null
}

export async function TischeRemoveEndpoint(dbpath: string, TischID: string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        }
    );
    try {
        const result = await fetchFirst(db, 'SELECT * FROM TISCHE WHERE TISCHE.TISCHID = ?', [TischID]);
        await fetchFirst(db, 'DELETE FROM TISCHE WHERE TISCHE.TISCHID = ?', [TischID]);
        if (result === undefined) {
            return ({ ok: false, error: "Tisch not found" });
       }    
        return ({ ok : true});
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null;
}
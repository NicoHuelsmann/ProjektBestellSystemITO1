import sqlite3 from "sqlite3";
import {fetchFirst} from "../server";
import {fetchAll} from "../server";

export default async function userEndpoint(dbpath:string,username:string){
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
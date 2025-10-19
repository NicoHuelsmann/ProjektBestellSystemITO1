import sqlite3 from "sqlite3";
import {fetchAll} from "../server";

export default async function BestellungenEndpoint(dbpath:string, besnr: string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return err;
            }
        }
    );
    try {
        const Bestllungen: any = await fetchAll(db, 'SELECT * FROM BESP WHERE BESNR = ?', [besnr]);
        return ({Bestellungen : Bestllungen });
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null
}

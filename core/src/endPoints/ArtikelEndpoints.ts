import sqlite3 from "sqlite3";
import {fetchAll} from "../server";

export default async function ArtikelEndpoint(dbpath:string,username:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        }
    );
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
        return data;
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }


return null
}

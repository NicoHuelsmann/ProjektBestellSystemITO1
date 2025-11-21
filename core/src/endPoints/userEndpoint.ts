import sqlite3 from "sqlite3";
import { fetchFirst } from "../server";

export async function userEndpointGetPersnrByUname(dbpath:string,username:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return (err);
            }
        }
    );
    try {
        const user: any = await fetchFirst(db, `SELECT USR01.PERSNR FROM USR01 WHERE USR01.UNAME=?`, [username]);
        if (!user)
            return null;
        ({userID: user.PERSNR, password: user.PWCODE});
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null;
}

export async function userEndpointGetUserByUserID(dbpath:string, userid:number){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return (err);
            }
        }
    );
    try {
        const user: any = await fetchFirst(db, `SELECT USR01.UNAME, USR01.NAME1, USR01.NAME2, USR01.UNAME, USR01.PWCODE FROM USR01 WHERE USR01.PERSNR=?`, [userid]);
        if (!user)
            return null;
        return ({Vorname: user.NAME1, Nachname: user.NAME2, Benutzername: user.UNAME, Passwort: user.PWCODE});
    }
    catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    return null
}
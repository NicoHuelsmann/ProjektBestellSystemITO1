import sqlite3 from "sqlite3";
import {fetchFirst} from "../server";

export default async function userEndpoint(dbpath:string,username:string){
    const db = new sqlite3.Database(dbpath,
        (err) => {
            if (err) {
                console.error(err.message);
                return (err);
            }
        }
    );
    try {
        const user: any = await fetchFirst(db, `SELECT USR01.PERSNR, USR01.PWCODE FROM USR01 WHERE USR01.UNAME=?`, [username]);
        return ({userID: user.PERSNR, password: user.PWCODE});
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }


return null
}